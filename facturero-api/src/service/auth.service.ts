import jwt = require('jsonwebtoken');
import bcrypt from "bcryptjs";
import { getLogger } from 'log4js';

import { IUser } from "../model/user";
import { ICompany } from "../model/company";
import UserRepository from "../repository/user.repository";
import CompanyRepository from "../repository/company.repository";
import CatalogRepository from '../repository/catalog.repository';
import { EmailService } from "./mail.service";
import ServiceException from "./service.exception";
import { Types } from 'mongoose';
import { Email } from '../model/email';
import { Catalog, ICatalog } from '../model/catalog';

const logger = getLogger("AuthService");

class AuthService {

    private _userRepository: UserRepository;
    private _companyRepository: CompanyRepository;
    private _catalogRepository: CatalogRepository;
    private emailService: EmailService;

    constructor() {
        this._userRepository = new UserRepository();
        this._companyRepository = new CompanyRepository();
        this._catalogRepository = new CatalogRepository();
        this.emailService = new EmailService();
    }

    async register(company: ICompany, user: IUser, password: string): Promise<IUser> {
        //Metodo que registra el usuario nuevo
        logger.debug('Start register', company, user);
        //Crea la empresa
        let companyCreated = await this._companyRepository.create(company);

        //resetea la id de la empresa
        user.company = companyCreated._id;
        //encripta la contraseña
        user.hash = bcrypt.hashSync(password, 10);
        //usuario desactivado
        user.active = false;
        // asigna rol SUPERADMIN
        user.role = 'SUPERADMIN';

        //Crea el usuario
        let userCreated: IUser = await this._userRepository.create(user);

        await this.initializeCompanyData(companyCreated);

        if (process.env.GMAIL_USER && process.env.GMAIL_SECRET) {
            //Asigna cuenta de email 
            let email: Email = {
                to: user.email,
                subject: 'Cuenta Creada Exitosamente',
                template: 'newaccount',
                context: { link: `${process.env.WEB_URL}/#/auth/activate-account/${userCreated._id}` }
            }
            //envia el correo
            await this.emailService.sendMail(email);
        } else {
            //si no tiene cuenta de correo activa el usuario directamente
            await this._userRepository.update(userCreated._id, { active: true });
            userCreated.active = true;

        }

        return userCreated;
    }

    async authenticate(email: string, password: string) {
        //envia a la base a buscar el email
        let user: IUser = await this._userRepository.findOne({ role: 'SUPERADMIN', email });
        //si no existe el usuario 
        if (!user)
            throw new ServiceException(403, "No existe este usuario como dueño de una empresa");
        //si el usuario no esta activo
        if (!user.active)
            throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo o comunicate con el administrador para activar tu cuenta");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Email o Password Incorrecto");

        let token = this.createToken(user);
        //genera el token
        return token;
    }

    async authenticateWithCompany(ruc: string, email: string, password: string) {
        let company: ICompany = await this._companyRepository.findOne({ ruc });
        //envia a la base a buscar el email
        let user: IUser = await this._userRepository.findOne({ company: company._id, email });
        //si no existe el usuario 
        if (!user)
            throw new ServiceException(403, "Usuario no existe");
        //si el usuario no esta activo
        if (!user.active)
            throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo para activar tu cuenta");
        //si la contraseña no coincide 
        if (!bcrypt.compareSync(password, String(user.hash)))
            throw new ServiceException(403, "Email o Password Incorrecto");

        let token = this.createToken(user);
        //genera el token
        return token;
    }
    //Olvido contraseña usuario propietario de empresa
    async forgotPassword(email: string) {
        let user: IUser = await this._userRepository.findOne({ role: 'SUPERADMIN', email });
        if (!user)
            throw new ServiceException(403, 'No existe una cuenta raiz con este usuario');

        if (!user.active)
            throw new ServiceException(403, 'Tu cuenta no esta activa revisa tu correo o comunicate con el administrador para activar tu cuenta');

        let token = this.forgotPasswordToken(user);
        let emailDto: Email = {
            to: email,
            subject: 'Cambia tu contraseña',
            template: 'changepassword',
            context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
        }
        this.emailService.sendMail(emailDto);
    }
    //Olvido contraseña para usuario de la empresa
    async forgotPasswordWithCompany(ruc: string, email: string) {
        let company: ICompany = await this._companyRepository.findOne({ ruc });
        let user: IUser = await this._userRepository.findOne({ company: company._id, email });
        if (!user)
            throw new ServiceException(403, 'Usuario no existe')

        let token = this.forgotPasswordToken(user);
        let emailDto: Email = {
            to: email,
            subject: 'Cambia tu contraseña',
            template: 'forgotpassword',
            context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
        }
        this.emailService.sendMail(emailDto);
    }
    //Cambio contraseña
    async resetPassword(token: string, password: string) {
        let jwtPayload = <any>jwt.verify(token, process.env.SECRET || '');
        let user = await this._userRepository.findById(jwtPayload.sub);
        if (!user)
            throw new ServiceException(404, "No existe este usuario");
        user.hash = bcrypt.hashSync(password, 10);
        await this._userRepository.update(user._id, user);
    }
    //Activa cuenta usuario
    async activateAccount(userId: string) {
        logger.debug('Start activateAccount', userId)
        await this._userRepository.update(this.toObjectId(userId), { active: true });
    }

    private async initializeCompanyData(company: ICompany) {

        let catalogs: ICatalog[] = [];

        //Cargar datos iniciales de la empresa
        let payment_method = new Catalog();
        payment_method.name = 'payment_method';
        payment_method.active = true;
        payment_method.company = company._id;
        payment_method.items = [
            { code: '01', value: 'SIN UTILIZACION DEL SISTEMA FINANCIERO' },
            { code: '15', value: 'COMPENSACION DE DEUDAS' },
            { code: '16', value: 'TARJETA DE DEBITO' },
            { code: '17', value: 'DINERO ELECTRONICO' },
            { code: '18', value: 'TARJETA PREPAGO' },
            { code: '19', value: 'TARJETA DE CREDITO' },
            { code: '20', value: 'OTROS CON UTILIZACION DEL SISTEMA FINANCIERO' },
            { code: '21', value: 'ENDOSO DE TITULOS' }
        ];

        catalogs.push(payment_method);

        let identification_type = new Catalog()
        identification_type.name = 'identification_type';
        identification_type.active = true;
        identification_type.company = company._id;
        identification_type.items =
        [
            { code: 'C', value: 'CEDULA' },
            { code: 'R', value: 'RUC' },
            { code: 'P', value: 'PASAPORTE' },
            { code: 'I', value: 'IDENTIFICACION DEL EXTERIOR' },
            { code: 'L', value: 'PLACA' }
        ];

        catalogs.push(identification_type);

        let customer_type = new Catalog();
        customer_type.name = 'customer_type';
        customer_type.active = true;
        customer_type.company = company._id;
        customer_type.items =
        [
            { code: 'C', value: 'CLIENTE' },
            { code: 'R', value: 'SUJETO RETENIDO' },
            { code: 'D', value: 'DESTINATARIO' }
        ];

        catalogs.push(customer_type);

        let product_type = new Catalog();
        product_type.name = 'product_type';
        product_type.active = true;
        product_type.company = company._id;
        product_type.items =
        [
            { code: 'B', value: 'BIEN' },
            { code: 'S', value: 'SERVICIO' }
        ];

        catalogs.push(product_type);

        let tax_type = new Catalog();
        tax_type.name = 'tax_type';
        tax_type.active = true;
        tax_type.company = company._id;
        tax_type.items =
        [
            { code: 'IVA', value: 'IVA' },
            { code: 'ICE', value: 'ICE' },
            { code: 'IRBPNR', value: 'IRBPNR' }
        ];

        catalogs.push(tax_type);

        this._catalogRepository.insertMany(catalogs);


    }

    //Crea el token válido por un día en el cual consta el rol y id del usuario
    private createToken(user: IUser) {
        //genera una variable pero es constante la misma que no cambia su valor
        const expiresIn = 60 * 60 * 24; //60 seg x 60 min x 24 hours=1 día
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id,
            role: user.role
        }
        //permite declarar una variable que puede cambiar su valor
        let token = {
            result: user,
            //firma el token
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
        return token;
    }
    //Asigna token para cambio de contraseña
    private forgotPasswordToken(user: IUser) {
        const expiresIn = 60 * 5; //60 seg x 5 min 
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id
        }
        return jwt.sign(dataStoredInToken, secret, { expiresIn });
    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }


}
Object.seal(AuthService);
export = AuthService;
