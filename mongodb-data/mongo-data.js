db = db.getSiblingDB("facturero");

print("Taxes initialization start!");
db.createCollection("taxes");
db.createCollection("taxvalues");

const iva = db.taxes.insertOne({ name: "IVA", active: true });
db.taxvalues.insertMany([
    { tax: iva.insertedId, _id: '0', percentage: 0, retention: 0, description: '0%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '1', percentage: 0, retention: 30, description: '30%', type: 'R', active: false },
    { tax: iva.insertedId, _id: '2', percentage: 12, retention: 70, description: '12%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '3', percentage: 14, retention: 70, description: '14%', type: 'I', active: false },
    { tax: iva.insertedId, _id: '6', percentage: 0, retention: 0, description: 'NO OBJETO DE IMPUESTO', type: 'I', active: true },
    { tax: iva.insertedId, _id: '7', percentage: 0, retention: 0, description: 'EXCEPTO%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '8', percentage: 12, retention: 70, description: '12%', type: 'A', active: false }]
);

const irbpnr = db.taxes.insertOne({ name: "IRBPNR", active: true });
db.taxvalues.insertMany([
    { tax: irbpnr.insertedId, _id: '5001', percentage: 0, retention: 0, description: 'BOTELLAS PLASTICAS NO RETORNABLES', type: 'B', active: true }
]);


const ice = db.taxes.insertOne({ name: "ICE", active: true });
db.taxvalues.insertMany([
    { tax: ice.insertedId, _id: '3011', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-RUBIOS', type: 'I', active: true },
    { tax: ice.insertedId, _id: '3021', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-NEGROS', type: 'I', active: true },
    { tax: ice.insertedId, _id: '3023', percentage: 150, retention: 0, description: 'ICE-PRODUCTOS DEL TABACO Y SUS SUCEDANIOS DEL TABACO EXCEPTO CIGARILLOS', type: 'I', active: true },
    { tax: ice.insertedId, _id: '3031', percentage: 0, retention: 0, description: 'ICE-ALCOHOL Y PRODUCTOS DE ALCOHOL DISTINTOS A LA CERVEZA', type: 'I', active: true },
    { tax: ice.insertedId, _id: '3041', percentage: 0, retention: 0, description: 'ICE-CERVEZA', type: 'I', active: true },
    { tax: ice.insertedId, _id: '3051', percentage: 10, retention: 0, description: 'ICE-BEBIDAS GASEOSAS', type: 'I', active: true }
]);

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