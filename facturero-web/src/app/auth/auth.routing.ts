import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoginCompanyComponent } from './login-company/login-company.component';

//se define las rutas de la autentificación facilitando la movilidad entre pantallas inicializandolas
export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'lock',
        component: LockComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'pricing',
        component: PricingComponent
    }, {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'activate-account/:userId',
        component: ActivateAccountComponent
    },
    {
        path: 'update-password',
        component: UpdatePasswordComponent
    },
    {
        path: 'login-company',
        component: LoginCompanyComponent
    }
];
