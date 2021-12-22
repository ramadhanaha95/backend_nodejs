import {
    MYSQL,
    SQLSRV
} from '../config/database.js'
import resp_code from '../src/libs/response_code.js'
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

//Multiple File Dengan Name Yang Sama
export async function Upload(req, res) {
    try{
        //Untuk Menangkap Form-Data
        let form = formidable({ multiples: true })
        await form.parse(req, function (err, fields, files) {

            let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            files.gambar.forEach(data => {
                //Mengolah Form Name Array Gambar
                let dt_gambar = new Date()
                let dtf_gambar = dt_gambar.getTime()
                let nf_gambar = ''
                for (let i = 0; i<15; i++){
                    nf_gambar += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
                }
                let nama_file_gambar = nf_gambar + dtf_gambar
                let arr_filename_gambar = data.originalFilename.split(".")
                let ext_gambar = arr_filename_gambar[arr_filename_gambar.length-1]
                let tujuan_gambar = nama_file_gambar+"."+ext_gambar
                fs.readFile(data.filepath, async (err, result) => {
                    const ftp_client = await new FTPClient()
                    await ftp_client.connect(ftp1)
                    await ftp_client.on('ready', function () {
                        ftp_client.put(result,tujuan_gambar, function (err) {
                            if(err) {
                                res.json(err)
                            }
                        })
                    })
                })
                var query = `INSERT INTO file_upload (user_id, file) VALUES (?,?)`
                MYSQL.query(query, [req.user.id, tujuan_gambar])
            })
            res.json(resp_code[4]) 
        })
    }catch(e){
        console.log(e)
    }
}

//Multiple/Single File Dengan Name Yang Berbeda
export async function Upload2(req, res) {
    try{
        //Untuk Menangkap Form-Data
        let form = formidable({ multiples: true })
        await form.parse(req, async function (err, fields, files) {

            let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            //Mengolah Form Name Gambar1
            let dt_gambar1 = new Date()
            let dtf_gambar1 = dt_gambar1.getTime()
            let nf_gambar1 = ''
            for (let i = 0; i<15; i++){
                nf_gambar1 += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            let nama_file_gambar1 = nf_gambar1 + dtf_gambar1
            let arr_filename_gambar1 = files.gambar1.originalFilename.split(".")
            let ext_gambar1 = arr_filename_gambar1[arr_filename_gambar1.length-1]
            let tujuan_gambar1 = nama_file_gambar1+"."+ext_gambar1
            fs.readFile(files.gambar1.filepath, async (err, result) => {
                const ftp_client = await new FTPClient()
                await ftp_client.connect(ftp1)
                await ftp_client.on('ready', function () {
                    ftp_client.put(result,tujuan_gambar1, function (err) {
                        if(err) {
                            res.json(err)
                        }
                    })
                })
            })

            //Mengolah Form Name gambar2
            let dt_gambar2 = new Date()
            let dtf_gambar2 = dt_gambar2.getTime()
            let nf_gambar2 = ''
            for (let i = 0; i<15; i++){
                nf_gambar2 += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            let nama_file_gambar2 = nf_gambar2 + dtf_gambar2
            let arr_filename_gambar2 = files.gambar2.originalFilename.split(".")
            let ext_gambar2 = arr_filename_gambar2[arr_filename_gambar2.length-1]
            let tujuan_gambar2 = nama_file_gambar2+"."+ext_gambar2
            fs.readFile(files.gambar2.filepath, async (err, result) => {
                const ftp_client = await new FTPClient()
                await ftp_client.connect(ftp1)
                await ftp_client.on('ready', function () {
                    ftp_client.put(result,tujuan_gambar2, function (err) {
                        if(err) {
                            res.json(err)
                        }
                    })
                })
            })

            //Mengolah Form Name gambar3
            let dt_gambar3 = new Date()
            let dtf_gambar3 = dt_gambar3.getTime()
            let nf_gambar3 = ''
            for (let i = 0; i<15; i++){
                nf_gambar3 += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            let nama_file_gambar3 = nf_gambar3 + dtf_gambar3
            let arr_filename_gambar3 = files.gambar3.originalFilename.split(".")
            let ext_gambar3 = arr_filename_gambar3[arr_filename_gambar3.length-1]
            let tujuan_gambar3 = nama_file_gambar3+"."+ext_gambar3
            fs.readFile(files.gambar3.filepath, async (err, result) => {
                const ftp_client = await new FTPClient()
                await ftp_client.connect(ftp1)
                await ftp_client.on('ready', function () {
                    ftp_client.put(result,tujuan_gambar3, function (err) {
                        if(err) {
                            res.json(err)
                        }
                    })
                })
            })

            //Mengolah Form Name gambar4
            let dt_gambar4 = new Date()
            let dtf_gambar4 = dt_gambar4.getTime()
            let nf_gambar4 = ''
            for (let i = 0; i<15; i++){
                nf_gambar4 += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            let nama_file_gambar4 = nf_gambar4 + dtf_gambar4
            let arr_filename_gambar4 = files.gambar4.originalFilename.split(".")
            let ext_gambar4 = arr_filename_gambar4[arr_filename_gambar4.length-1]
            let tujuan_gambar4 = nama_file_gambar4+"."+ext_gambar4
            fs.readFile(files.gambar4.filepath, async (err, result) => {
                const ftp_client = await new FTPClient()
                await ftp_client.connect(ftp1)
                await ftp_client.on('ready', function () {
                    ftp_client.put(result,tujuan_gambar4, function (err) {
                        if(err) {
                            res.json(err)
                        }
                    })
                })
            })
            var query = `INSERT INTO file_upload2 (user_id, gambar1, gambar2, gambar3, gambar4) VALUES (?,?,?,?,?)`
            await MYSQL.query(query, [req.user.id, tujuan_gambar1,tujuan_gambar2,tujuan_gambar3,tujuan_gambar4])
            return res.json(files)
        })
    }catch(e){
        console.log(e)
    }
}

//export fuction bisa di taruh di bawah
//atau di taruh di depan function
//ex: export const <nama function>