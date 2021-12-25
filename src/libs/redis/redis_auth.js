import {
    createClient
} from "redis"
import dotenv from 'dotenv'
dotenv.config()

const redisPort = process.env.REDIS_PORT

export async function GetJwtFromRedis(user_id) {
    try {
        const client = createClient(redisPort);
        await client.on('ready', (err) => {
            if (err) {
                console.log(err)
            }
        })
        await client.connect()
        const get_token_from_redis = await client.get("user_id_redis_" + user_id.toString())
        await client.disconnect()
        return get_token_from_redis
    } catch (error) {
        return 'redis_error'
    }
}

export async function PushJwtToRedis(user_id,token) {
    try {
        const client = createClient(redisPort);
        await client.on('ready', (err) => {
            if (err) {
                console.log(err)
            }
        })
        await client.connect()
        await client.set("user_id_redis_" + user_id.toString(), token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
            if (err) {
                console.log(err.message)
                reject(createError.InternalServerError())
                return
            }
            resolve(reply)
        })
        await client.disconnect()
    } catch (error) {
        return 'redis_error'
    }
}

export async function DestroyJwtFromRedis(user_id) {
    try {
        const client = createClient(redisPort);
        await client.on('ready', (err) => {
            if (err) {
                console.log(err)
            }
        })
        await client.connect()
        await client.DEL("user_id_redis_" + user_id.toString())
        await client.disconnect()
        return 'Successfull Delete Token From Redis'
    } catch (error) {
        return 'redis_error'
    }
}