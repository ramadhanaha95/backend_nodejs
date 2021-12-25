import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import {
    createClient
} from "redis"
import {
    GetJwtFromRedis,
    PushJwtToRedis,
    DestroyJwtFromRedis
} from '../../libs/redis/redis_auth.js'


//Auth Dengan Redis Apabila Server Redis Sedang Uptime
export const GetJwtTokenRedis = async (id, role_id, email_verification_status) => {
    const get_token_from_redis = await GetJwtFromRedis(id)
    if (get_token_from_redis == 'redis_error') {
        return get_token_from_redis
    } else {
        if (get_token_from_redis != null) {
            let data_token = {
                token: get_token_from_redis,
                msg: "Redis is Live"
            }
            return data_token
        } else {
            const token = await Jwt.sign({
                id: id,
                role_id: role_id,
                email_verification_status: email_verification_status
            }, process.env.TOKEN_SECRET, {
                expiresIn: '100h'
            });
            await PushJwtToRedis(id, token)
            let data_token = {
                token: token,
                msg: "Redis is Live and Succesuly Push Token"
            }
            return data_token
        }
    }
}

//Auth Tanpa Redis Apabila Server Redis Sedang Downtime (Perpindahan Secara Otomatis)
export const GetJwtToken = async (id, role_id, email_verification_status) => {
    const token = await Jwt.sign({
        id: id,
        role_id: role_id,
        email_verification_status: email_verification_status
    }, process.env.TOKEN_SECRET, {
        expiresIn: '100h'
    });
    let data_token = {
        token: token,
        msg: "Redis is Down"
    }
    return data_token
}

//JWT MENGGUNAKAN REDIS

export const VerifyTokenRedis = async (req, res, next) => {
    const theToken =
        req.body.token || req.query.token || req.headers.token;
    if (!theToken) {
        return res.status(403).json("A token is required for authentication")
    }
    try {
        const decoded = await Jwt.verify(theToken, process.env.TOKEN_SECRET)
        req.user = decoded
        const get_token_from_redis = await GetJwtFromRedis(decoded.id)

        if (get_token_from_redis != 'redis_error') {
            if (get_token_from_redis == theToken) {
                if (decoded.email_verification_status == 1) {
                    let data = {
                        msg: "Please check and verify the email first",
                        user_id: decoded.id
                    }
                    return res.status(403).json(data)
                }
            } else {
                let data = {
                    msg: "Please Re Login"
                }
                return res.status(403).json(data)
            }
            return next();
        } else {
            return next();
        }
        
    } catch (err) {
        return res.status(401).json("Invalid Token")
    }
}

export const JwtLogoutRedis = async (payload) => {
    const DestroyJWT = await DestroyJwtFromRedis(payload)
    return DestroyJWT
}

// export const VerifyToken = async (req, res, next) => {
//     const theToken =
//         req.body.token || req.query.token || req.headers.token;

//     if (!theToken) {
//         return res.status(403).json("A token is required for authentication")
//     }
//     try {
//         const decoded = await Jwt.verify(theToken, process.env.TOKEN_SECRET)
//         req.user = decoded
//         if (decoded.email_verification_status == 1) {
//             let data = {
//                 msg: "Please check and verify the email first",
//                 user_id: decoded.id
//             }
//             return res.status(403).json(data)
//         }
//     } catch (err) {
//         return res.status(401).json("Invalid Token")
//     }
//     return next();
// };