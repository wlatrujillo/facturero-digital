'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CatalogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    items: {
        type: [{ code: String, value: String }],
        required: true
    }
});

CatalogSchema.index({ name: 1 }, { unique: true });

let Catalog = module.exports = mongoose.model('Catalog', CatalogSchema);



let create = async (catalog) => {

    let catalogFound = await Catalog.findOne({ name: catalog.name });

    if (catalogFound) {
        await Catalog.deleteMany({ name: catalog.name });
    }

    await Catalog.create(catalog);
}

const payment_method = {
    name: "payment_method",
    active: true,
    items: [
        { code: '01', value: 'SIN UTILIZACION DEL SISTEMA FINANCIERO' },
        { code: '15', value: 'COMPENSACION DE DEUDAS' },
        { code: '16', value: 'TARJETA DE DEBITO' },
        { code: '17', value: 'DINERO ELECTRONICO' },
        { code: '18', value: 'TARJETA PREPAGO' },
        { code: '19', value: 'TARJETA DE CREDITO' },
        { code: '20', value: 'OTROS CON UTILIZACION DEL SISTEMA FINANCIERO' },
        { code: '21', value: 'ENDOSO DE TITULOS' }
    ]
}

const identification_type = {
    name: "identification_type",
    active: true,
    items: [
        { code: 'C', value: 'CEDULA' },
        { code: 'R', value: 'RUC' },
        { code: 'P', value: 'PASAPORTE' },
        { code: 'I', value: 'IDENTIFICACION DEL EXTERIOR' },
        { code: 'L', value: 'PLACA' }
    ]
}

const customer_type = {
    name: "customer_type",
    active: true,
    items: [
        { code: 'C', value: 'CLIENTE' },
        { code: 'R', value: 'SUJETO RETENIDO' },
        { code: 'D', value: 'DESTINATARIO' }
    ]
}

const product_type = {
    name: "product_type",
    active: true,
    items: [
        { code: 'B', value: 'BIEN' },
        { code: 'S', value: 'SERVICIO' }
    ]
}

const tax_type = {
    name: "tax_type",
    active: true,
    items: [
        { code: 'IVA', value: 'IVA' },
        { code: 'ICE', value: 'ICE' },
        { code: 'IRBPNR', value: 'IRBPNR' }
    ]
}

let createCatalogs = async () => {
    await create(payment_method);
    await create(identification_type);
    await create(customer_type);
    await create(product_type);
    await create(tax_type);
}



module.exports.createCatalogs = createCatalogs;

