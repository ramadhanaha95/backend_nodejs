import mysql from 'mysql'
import util from 'util'
import dotenv from 'dotenv'
dotenv.config()

//DATABASE CONFIGURATION
const config = {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    sqlsrv: {
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
    }
}

//MYSQL CONNECTION
var MYSQL;
async function handleDisconnect() {
    try{
        MYSQL = await mysql.createConnection(config.mysql);
        // promise wrapper to enable async await with MYSQL
        MYSQL.query = util.promisify(MYSQL.query).bind(MYSQL);

        MYSQL.connect(function (err) {
            if (err) {
                console.log("error connecting: " + err.stack);
                setTimeout(handleDisconnect, 2000);
            } else {
                console.log("connected as... " + MYSQL.threadId);
            }
        }); // process asynchronous requests in the meantime.

        // If you're also serving http, display a 503 error.
        MYSQL.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                handleDisconnect(); // lost due to either server restart, or a
            } else { // connnection idle timeout (the wait_timeout
                console.log(err); // server variable configures this)
                setTimeout(handleDisconnect, 2000);
            }
        });
    } catch (err) {
        console.log(err)
        setTimeout(handleDisconnect, 2000);
    }

}
handleDisconnect();

export {
    MYSQL
}