db = db.getSiblingDB("facturero");

db.createCollection("roles");


db.roles.insertMany([
    {
        "_id": "SUPERADMIN",
        "name": "SUPERADMIN",
        "description": "Rol super administrador",
        "active": true
    },
    {
        "_id": "ADMIN",
        "name": "ADMIN",
        "description": "Rol administrador",
        "active": true
    },
    {
        "_id": "USER",
        "name": "USER",
        "description": "Rol SalesMan",
        "active": true
    }

]);

print("Roles initialization complete!");

db.createCollection("taxes");

db.createCollection("tax-values");

const iva = db.taxes.insertOne({ name: "IVA", active: true });

db.roles.insertMany([
    { tax: iva.insertedId, _id: '0', percentage: 0, retention: 0, description: '0%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '1', percentage: 0, retention: 30, description: '30%', type: 'R', active: false },
    { tax: iva.insertedId, _id: '2', percentage: 12, retention: 70, description: '12%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '3', percentage: 14, retention: 70, description: '14%', type: 'I', active: false },
    { tax: iva.insertedId, _id: '6', percentage: 0, retention: 0, description: 'NO OBJETO DE IMPUESTO', type: 'I', active: true },
    { tax: iva.insertedId, _id: '7', percentage: 0, retention: 0, description: 'EXCEPTO%', type: 'I', active: true },
    { tax: iva.insertedId, _id: '8', percentage: 12, retention: 70, description: '12%', type: 'A', active: false }]
);

const irbpnr = db.taxes.insertOne({ name: "IRBPNR", active: true });

db.roles.insertMany([
    { tax: irbpnr.insertedId, _id: '5001', percentage: 0, retention: 0, description: 'BOTELLAS PLASTICAS NO RETORNABLES', type: 'B', active: true }
]);


const ice = db.taxes.insertOne({ name: "ICE", active: true });

db.roles.insertMany([
    { tax: ice.isertedId, _id: '3011', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-RUBIOS', type: 'I', active: true },
    { tax: ice.isertedId, _id: '3021', percentage: 0, retention: 0, description: 'ICE-CIGARRILLOS-NEGROS', type: 'I', active: true },
    { tax: ice.isertedId, _id: '3023', percentage: 150, retention: 0, description: 'ICE-PRODUCTOS DEL TABACO Y SUS SUCEDANIOS DEL TABACO EXCEPTO CIGARILLOS', type: 'I', active: true },
    { tax: ice.isertedId, _id: '3031', percentage: 0, retention: 0, description: 'ICE-ALCOHOL Y PRODUCTOS DE ALCOHOL DISTINTOS A LA CERVEZA', type: 'I', active: true },
    { tax: ice.isertedId, _id: '3041', percentage: 0, retention: 0, description: 'ICE-CERVEZA', type: 'I', active: true },
    { tax: ice.isertedId, _id: '3051', percentage: 10, retention: 0, description: 'ICE-BEBIDAS GASEOSAS', type: 'I', active: true }
]);
