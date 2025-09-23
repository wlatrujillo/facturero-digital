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

db.menus.insertMany([
    { parent: invoicing.insertedId, path: 'product', title: 'Productos', ab: 'PR', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: invoicing.insertedId, path: 'customer', title: 'Clientes', ab: 'CL', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: invoicing.insertedId, path: 'establishment', title: 'Establecimientos', ab: 'ES', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: invoicing.insertedId, path: 'invoice', title: 'Facturas', ab: 'FA', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
    { parent: invoicing.insertedId, path: 'user', title: 'Usuarios', ab: 'US', roles: ['SUPERADMIN', 'ADMIN'] },
    { parent: invoicing.insertedId, path: 'query-invoice', title: 'Consulta Facturas', ab: 'CF', roles: ['SUPERADMIN', 'ADMIN'] }
]);