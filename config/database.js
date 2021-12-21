import mysql from 'mysql'
import util from 'util'
import dotenv from 'dotenv'
dotenv.config()

//this is for database config

// const DB = async () => {
//     return await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE
//     })
// };

// const DB2 = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

// //config SQLSRV
// const SQLSRV = {
//     server: 'LAPTOP-RLTF1Q8A\\SQLSERVER',
//     port: process.env.MSSQL_PORT,
//     user: process.env.MSSQL_USERNAME,
//     password: process.env.MSSQL_PASSWORD,
//     database: process.env.MSSQL_DATABASE,
//     options: {
//         enableArithAbort: true
//     },
//     synchronize: true,
//     trustServerCertificate: true,
// };

// export {DB,DB2,SQLSRV};

//MYSQL CONNECTION
const MYSQL = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
// promise wrapper to enable async await with MYSQL
MYSQL.query = util.promisify(MYSQL.query).bind(MYSQL);

//SQLSRV CONNECTION
const SQLSRV = {
    server: 'LAPTOP-RLTF1Q8A\\SQLSERVER',
    port: process.env.MSSQL_PORT,
    user: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DATABASE,
    options: {
        enableArithAbort: true
    },
    synchronize: true,
    trustServerCertificate: true,
};

export {MYSQL, SQLSRV}