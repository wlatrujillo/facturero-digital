db = db.getSiblingDB("facturero");

db.createCollection("catalogs");

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


db.catalogs.insertOne(payment_method);
db.catalogs.insertOne(identification_type);
db.catalogs.insertOne(customer_type);
db.catalogs.insertOne(product_type);

