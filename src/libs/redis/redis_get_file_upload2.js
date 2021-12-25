import {
    GetJwtFromRedis
} from '../../../src/libs/redis/connect.js'

export async function get_file_upload2_from_redis(payload) {
    const query = JSON.parse(JSON.stringify(payload))
    try {
        await redisClient.connect()
        const hasil_redis = await redisClient.get(query)
        await redisClient.disconnect()
        return JSON.parse(hasil_redis)
    } catch (error) {
        return "redis_error"
    }
}

export async function push_file_upload2_to_redis(payload, payload2) {
    const query = JSON.parse(JSON.stringify(payload))
    try {
        await redisClient.connect()
        await redisClient.set(query, JSON.stringify(payload2))
        await redisClient.disconnect()
    } catch (error) {
        return "redis_error"
    }
}