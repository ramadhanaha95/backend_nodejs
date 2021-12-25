import {
    MYSQL
} from '../config/database.js'
import bcrypt from 'bcrypt'
import resp_code from '../src/libs/response/response_code.js'
//this is to get jwt token
import {
    GetJwtToken,
    GetJwtTokenRedis,
    JwtLogoutRedis
} from '../src/auth/jwt/useJwt.js'
import {
    login_validation,
    register_validation
} from '../src/validations/form_validation.js'

import {
    transporter,
    mailOptions
} from '../config/email.js'
import Mustache, * as mustache from 'mustache'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

export async function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //this is for login validation
    var credential = login_validation(username, password)

    if (credential == true) {
        try {
            var query1 = "SELECT * FROM users WHERE username = ? and user_banned = ?";
            const [login] = await MYSQL.query(query1, [username, 1])

            if (login) {
                var cek_password = bcrypt.compareSync(password, login.password);

                if (cek_password == true) {

                    //Menggunakan Redis Untuk Auth
                    const token_from_redis = await GetJwtTokenRedis(login.id, login.role_id, login.email_verification_status)

                    //Kondisi Jika Redis Down
                    if (token_from_redis == "redis_error") {
                        const token_non_redis = await GetJwtToken(login.id, login.role_id, login.email_verification_status)
                        var query1 = 'UPDATE users SET last_login = now() WHERE id = ?'
                        const last_login = MYSQL.query(query1, login.id);
                        //IF GENERATE TOKEN SUCCESS
                        let data = [{
                            token: token_non_redis,
                            resp_code: resp_code[0],
                            from_redis: false
                        }];
                        return res.json(data)
                    } else {
                        var query1 = 'UPDATE users SET last_login = now() WHERE id = ?'
                        const last_login = MYSQL.query(query1, login.id);
                        //IF GENERATE TOKEN SUCCESS
                        let data = [{
                            token: token_from_redis,
                            resp_code: resp_code[0],
                            from_redis: true
                        }];
                        return res.json(data)
                    }
                    //console.log(token)
                    // var getResponseDecrypt = SetResponseJsonDecrypt(getResponse)
                } else {
                    var data = [resp_code[1]];
                    return res.json(data)
                }
            } else {
                var data = [resp_code[1]];
                return res.json(data)
            }
        } catch (err) {
            return res.json(err)
        }
    } else {
        var data = [resp_code[3]];
        return res.json(data)
    }
}

export async function register(req, res, next) {

    let template = fs.readFileSync('./src/views/email/mailer.html', 'utf8');
    var username = req.body.username.toLowerCase();
    var password = req.body.password;
    var email = req.body.email;
    var nama_lengkap = req.body.nama_lengkap.toUpperCase();
    var handphone = req.body.handphone;
    var whatsapp = req.body.whatsapp;

    //hashing password
    var salt = bcrypt.genSaltSync(12);
    var hashPassword = bcrypt.hashSync(password, salt);

    var reg_validation = register_validation(req.body)

    if (reg_validation == true) {
        try {
            let email_verification = ''
            let randomChars = '1234567890';
            for (let i = 0; i < 6; i++) {
                email_verification += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            await MYSQL.beginTransaction()

            var query1 = `INSERT INTO users (username, password, email, role_id,email_verification) VALUES (?,?,?,?,?)`;
            const insert_users = await MYSQL.query(query1, [username, hashPassword, email, 1, email_verification])

            var query2 = `INSERT INTO user_details (user_id, nama_lengkap, handphone, whatsapp) VALUES (?,?,?,?)`;
            const insert_user_details = await MYSQL.query(query2, [insert_users.insertId, nama_lengkap, handphone, whatsapp])

            //Mengirim Email Registrasi

            var payload = {
                "nama_lengkap": nama_lengkap,
                "email_verification": email_verification,
                "app_url": process.env.APP_URL,
                "user_id": insert_users.insertId,
            }
            mailOptions.to = email
            mailOptions.html = Mustache.render(template, payload)
            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
            });
            await MYSQL.commit()
            return res.status(200).json("Silahkan Cek Email Anda")

        } catch (err) {
            await MYSQL.rollback(() => {
                return res.json(err.message)
            });
        }
    } else {
        var data = resp_code[3];
        data.status = reg_validation
        return res.json(data)
    }
}

export async function getDataUser(req, res) {
    var user_id = req.user.id
    var user_from_jwt = req.user
    try {
        //select from table view user_data
        var query = `SELECT a.* FROM user_details as a WHERE a.id = ?`;
        const [users] = await MYSQL.query(query, [user_id])

        return res.json(user_from_jwt)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function register_verification(req, res) {
    let user_id = req.body.user_id
    let email_verification = req.body.verification_code
    try {
        var query_select_users = "SELECT * FROM users where id = ?"
        const [select_users] = await MYSQL.query(query_select_users, [user_id])

        if (email_verification == select_users.email_verification) {
            MYSQL.beginTransaction()

            var query_update_users = "UPDATE users SET email_verification_status = 2 WHERE id = ?"
            MYSQL.query(query_update_users, [user_id])

            const token_from_redis = await GetJwtTokenRedis(select_users.id, select_users.role_id, 2)

            //Kondisi Jika Redis Down
            if (token_from_redis == "redis_error") {
                const token_non_redis = await GetJwtToken(select_users.id, select_users.role_id, 2)
                var query1 = 'UPDATE users SET last_login = now() WHERE id = ?'
                const last_login = await MYSQL.query(query1, user_id);
                //IF GENERATE TOKEN SUCCESS
                let data = [{
                    token: token_non_redis,
                    resp_code: resp_code[0],
                    from_redis: false
                }];
                await MYSQL.commit()
                return res.json(data)
            } else {
                var query1 = 'UPDATE users SET last_login = now() WHERE id = ?'
                const last_login = await MYSQL.query(query1, user_id);
                //IF GENERATE TOKEN SUCCESS
                let data = [{
                    token: token_from_redis,
                    resp_code: resp_code[0],
                    from_redis: true
                }];
                await MYSQL.commit()
                return res.json(data)
            }

        } else {
            return res.json("Kode verifikasi salah, mohon coba lagi")
        }

    } catch (err) {
        return res.status(500).json(err)
    }
}

export async function Logout(req, res) {
    var user_id = req.user.id
    const logout_user = await JwtLogoutRedis(user_id)
    return res.json(logout_user)
}