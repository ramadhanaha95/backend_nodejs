import dotenv from 'dotenv'
dotenv.config()

//this is for ftp config
export const ftp1 = {
     host: process.env.FTP_HOST,
     port: process.env.FTP_PORT,
     user: process.env.FTP_USERNAME,
     password: process.env.FTP_PASSWORD,
}