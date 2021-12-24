import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {
    client
} from '../../../src/libs/redis/connect.js'
dotenv.config()

export const GetJwtToken = (id, role_id, email_verification_status) => {
    const token = Jwt.sign({
        id: id,
        role_id: role_id,
        email_verification_status: email_verification_status
    }, process.env.TOKEN_SECRET, {
        expiresIn: '100h'
    });

    return token
}

export const VerifyToken = (req, res, next) => {
    const theToken =
        req.body.token || req.query.token || req.headers.token;

    if (!theToken) {
        return res.status(403).json("A token is required for authentication")
    }
    try {
        const decoded = Jwt.verify(theToken, process.env.TOKEN_SECRET)
        req.user = decoded
        if (decoded.email_verification_status == 1) {
            let data = {
                msg: "Please check and verify the email first",
                user_id: decoded.id
            }
            return res.status(403).json(data)
        }
    } catch (err) {
        return res.status(401).json("Invalid Token")
    }
    return next();
};

//JWT MENGGUNAKAN REDIS

export const GetJwtTokenRedis = async (id, role_id, email_verification_status) => {
    const get_token_from_redis = await client.get("user_id_redis_"+id.toString())
    if (get_token_from_redis != null) {
        return get_token_from_redis
    } else {
        const token = await Jwt.sign({
            id: id,
            role_id: role_id,
            email_verification_status: email_verification_status
        }, process.env.TOKEN_SECRET, {
            expiresIn: '100h'
        });
        await client.set("user_id_redis_"+id.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
            if (err) {
                console.log(err.message)
                reject(createError.InternalServerError())
                return
            }
            resolve(reply)
        })

        return token
    }
}

export const VerifyTokenRedis = async (req, res, next) => {
    const theToken =
        req.body.token || req.query.token || req.headers.token;
    if (!theToken) {
        return res.status(403).json("A token is required for authentication")
    }
    try {
        const decoded = await Jwt.verify(theToken, process.env.TOKEN_SECRET)
        req.user = decoded
        const get_token_from_redis = await client.get("user_id_redis_"+decoded.id.toString())
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
    } catch (err) {
        return res.status(401).json("Invalid Token")
    }
    return next();
}

export const JwtRedisLogout = async (payload) => {
    await client.DEL("user_id_redis_"+payload.toString())
    return "Logout Success"
}