module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "entities": [
        "./src/modules/**/infra/typeorm/entities/*.ts"
    ],
    "migrations": [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    },
    "synchronize": false,
    "ssl": { 
        rejectUnauthorized: false 
    }
}