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

print("Roles initialization complete!");
