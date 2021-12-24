import {
    createClient
} from "redis";
const redisPort = 6379
const client = await createClient(redisPort)
await client.connect('connect', (err) => console.log('Redis Client Error', err))
await client.on('error', (err) => console.log('Redis Client Error', err))

export async function get_from_redis(payload) {
    const query = JSON.parse(JSON.stringify(payload))

    const hasil_redis = await client.get(query)
    return JSON.parse(hasil_redis)
}

export async function push_to_redis(payload,payload2) {
    const query = JSON.parse(JSON.stringify(payload))
    await client.set(query, JSON.stringify(payload2))
}