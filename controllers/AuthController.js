import {
    MYSQL
} from '../config/database.js'
import bcrypt from 'bcrypt'
import resp_code from '../src/libs/response/response_code.js'
//this is to get jwt token
import {
    GetJwtToken
} from '../src/auth/jwt/useJwt.js'
import {
    login_validation,
    register_validation
} from '../src/validations/form_validation.js'

import dotenv from 'dotenv'
dotenv.config()

export async function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //this is for login validation
    var credential = login_validation(username, password)

    if (credential == true) {
        try {
            var query1 = "SELECT * FROM users WHERE username = ?";
            const [login] = await MYSQL.query(query1, [username])

            if (login) {
                var cek_password = bcrypt.compareSync(password, login.password);

                if (cek_password == true) {
                    const token = GetJwtToken(login.id, login.role_id)

                    var query1 = 'UPDATE users SET last_login = now() WHERE id = ?'
                    const last_login = MYSQL.query(query1, login.id);

                    //IF GENERATE TOKEN SUCCESS
                    let data = [{
                        token: token,
                        resp_code: resp_code[0]
                    }];
                    // var getResponseDecrypt = SetResponseJsonDecrypt(getResponse)
                    return res.json(data)
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
            await MYSQL.beginTransaction()

            var query1 = `INSERT INTO users (username, password, email, role_id) VALUES (?,?,?,?)`;
            const insert_users = await MYSQL.query(query1, [username, hashPassword, email, 1])

            var query2 = `INSERT INTO user_details (user_id, nama_lengkap, handphone, whatsapp) VALUES (?,?,?,?)`;
            const insert_user_details = await MYSQL.query(query2, [insert_users.insertId, nama_lengkap, handphone, whatsapp])
            await MYSQL.commit()

            return res.send(resp_code[0])

        } catch (err) {
            await MYSQL.rollback(() => {
                return res.send(err)
            });
        }
    } else {
        var data = resp_code[3];
        data.status = reg_validation
        return res.send(data)
    }
}

export async function getDataUser(req, res) {
    var user_id = req.user.id

    //select from table view user_data
    try {
        var query = `SELECT a.* FROM user_data as a WHERE a.id = ?`;
        const [users] = await MYSQL.query(query, [user_id])
        
        return res.json(users)
    } catch (err) {
        return res.json(err)
    }
}