import mysql from 'mysql'
import sql from 'mssql'

import dotenv from 'dotenv'
dotenv.config()

//this is for database config

const DB = async () => {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
};

const DB2 = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

DB2.connect();

//config SQLSRV
const SQLSRV = {
    server: "LAPTOP-RLTF1Q8A\\SQLSERVER",
    port: 1433,
    user: 'sa',
    password: 'tufFx506i',
    database: 'node_project',
    options: {
        enableArithAbort: true
    },
    synchronize: true,
    trustServerCertificate: true,
};

export {DB,DB2,SQLSRV};