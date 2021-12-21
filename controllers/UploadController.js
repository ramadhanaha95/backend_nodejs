import {
    DB,
    DB2
} from '../config/database.js'
import bcrypt from 'bcrypt'
import resp_code from '../src/libs/response_code.js'

//this is set of data to encrypt or decrypt data
import {
    SetResponseJsonEncrypt
} from '../src/libs/response_encrypt.js'
import {
    SetResponseJsonDecrypt
} from '../src/libs/response_decrypt.js'

//this is to get jwt token
import {
    GetJwtToken
} from '../src/auth/jwt/useJwt.js'
import {
    login_validation,
    register_validation
} from '../src/validations/form_validation.js'

import dotenv from 'dotenv'

//Required when use File Upload
import FTPClient from 'ftp'
import fs from 'fs'
import formidable from 'formidable'

import {
    ftp1
} from '../config/filestorage.js'
import console from 'console'

dotenv.config()

//Single File
export function Upload(req, res) {
    let dt = new Date()
    let dtf = dt.getTime()
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nf = ''
    for (let i = 0; i < 15; i++) {
        nf += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    let nama_file = nf + dtf

    let form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        let arr_filename = files.image.originalFilename.split(".")
        let image_ext = arr_filename[arr_filename.length - 1]
        let newpath = nama_file + "." + image_ext;
        fs.readFile(files.image.filepath, async (err, result) => {
            const ftp_client = await new FTPClient();
            await ftp_client.connect(ftp1);
            await ftp_client.on('ready', function () {
                ftp_client.put(result, newpath,async function (err) {
                    if (err) {
                        return res.json(err)
                    } else {
                        const db = await DB()
                        try {
                            db.beginTransaction()
                            let query = `INSERT INTO file_upload (user_id, file) VALUES (?,?)`;
                            db.query(query, [req.user.id, newpath], (err, result) => {
                                if (err) {
                                    db.rollback(() => {
                                    return res.json(err)
                                    });
                                } else {
                                    db.commit()
                                }
                            })
                        } catch (err) {
                            await db.rollback(() => {
                                return res.json(err)
                            });
                        }
                    }
                });
            });
        })
    });
    return res.json(resp_code[4])
}

//Multiple File
export async function Upload2(req, res) {
    try{
        let form = new formidable.IncomingForm()
        await form.parse(req, function (err, fields, files) {
            // for (let i = 0; i < files.length; i++){
            //     return res.json(files[i].image)
            // }
            let data_image = JSON.parse(JSON.stringify(form.openedFiles))
            data_image.forEach(data => {
                let dt = new Date()
                let dtf = dt.getTime()
                let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let nf = ''
                for (let i = 0; i < 15; i++) {
                    nf += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }
                let nama_file = nf + dtf
                let arr_filename = data.originalFilename.split(".")
                let image_ext = arr_filename[arr_filename.length - 1]
    
                let newpath = nama_file + "." + image_ext;
                fs.readFile(data.filepath, async (err, result) => {
                    const ftp_client = await new FTPClient();
                    await ftp_client.connect(ftp1);
                    await ftp_client.on('ready', function () {
                        ftp_client.put(result, newpath, function (err) {
                            if (err) {
                                return res.json(err)
                            }
                        });
                    });
                    //await ftp_client.end();
                })
            })
        })
        return res.json(resp_code[4])
    }catch(e){
        console.log(e)
    }
}

//export fuction bisa di taruh di bawah
//atau di taruh di depan function
//ex: export const <nama function>