db = db.getSiblingDB("facturero");

print("Roles initialization start!");
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

print("Menu initialization start!");
db.createCollection("menus");
db.menus.insertOne({
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard',
    roles: ['SUPERADMIN', 'ADMIN', 'USER']
});
const invoicing = db.menus.insertOne({
    path: '/invoicing',
    title: 'Facturacion',
    type: 'sub',
    icontype: 'store',
    collapse: 'invoicing',
    roles: ['SUPERADMIN', 'ADMIN', 'USER']
});
const administration= db.menus.insertOne({
    path: '/admin',
    title: 'Administracion',
    type: 'sub',
    icontype: 'card_travel',
    collapse: 'admin',
    roles: ['SUPERADMIN', 'ADMIN', 'USER']
});


db.menus.insertMany([
    { parent: invoicing.insertedId, path: 'invoice', title: 'Facturas', ab: 'FA', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
    { parent: invoicing.insertedId, path: 'debit-note', title: 'Notas de Debito', ab: 'ND', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
    { parent: invoicing.insertedId, path: 'credit-note', title: 'Notas de Credito', ab: 'NC', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
    { parent: invoicing.insertedId, path: 'remittance-guide', title: 'Guia de Remision', ab: 'GR', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
]);
db.menus.insertMany([
    { parent: administration.insertedId, path: 'product', title: 'Productos', ab: 'PR', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'customer', title: 'Clientes', ab: 'CL', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'establishment', title: 'Establecimientos', ab: 'ES', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'user', title: 'Usuarios', ab: 'US', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'query-invoice', title: 'Consulta Facturas', ab: 'CF', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'tax-value', title: 'Impuestos', ab: 'IM', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: administration.insertedId, path: 'catlog', title: 'Catalogos', ab: 'CA', roles: ['SUPERADMIN', 'ADMIN'] }
]);