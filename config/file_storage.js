import FTPClient from 'ftp'

let ftp_client = new FTPClient();
let ftp1 = {
     host: "localhost",
     port: 21,
     user: 'bznid',
     password: 'josspeople',
}

export {
    ftp_client,
    ftp1
}