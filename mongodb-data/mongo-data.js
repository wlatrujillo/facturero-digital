db = db.getSiblingDB("facturero");

print('Start catalogs initialization')
db.createCollection("catalogs");

db.catalogs.insertOne( {
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
});
db.catalogs.insertOne( {
    name: "identification_type",
    active: true,
    items: [
        { code: 'C', value: 'CEDULA' },
        { code: 'R', value: 'RUC' },
        { code: 'P', value: 'PASAPORTE' },
        { code: 'I', value: 'IDENTIFICACION DEL EXTERIOR' },
        { code: 'L', value: 'PLACA' }
    ]
});
 db.catalogs.insertOne({
    name: "customer_type",
    active: true,
    items: [
        { code: 'C', value: 'CLIENTE' },
        { code: 'R', value: 'SUJETO RETENIDO' },
        { code: 'D', value: 'DESTINATARIO' }
    ]
});
db.catalogs.insertOne( {
    name: "product_type",
    active: true,
    items: [
        { code: 'B', value: 'BIEN' },
        { code: 'S', value: 'SERVICIO' }
    ]
});
db.catalogs.insertOne( {
    name: "tax_type",
    active: true,
    items: [
        { code: 'IVA', value: 'IVA' },
        { code: 'ICE', value: 'ICE' },
        { code: 'IRBPNR', value: 'IRBPNR' }
    ]
});