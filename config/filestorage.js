import FTPClient from 'ftp'

//this is for ftp config
let ftp_client = new FTPClient();
let ftp1 = {
     host: "localhost",
     port: 21,
     user: 'admin',
     password: 'tufFx506i',
}

export {
    ftp_client,
    ftp1
}