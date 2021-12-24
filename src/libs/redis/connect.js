import {
    createClient
} from "redis";
const redisPort = 6379
export const client = await createClient(redisPort)
await client.connect('connect', (err) => console.log('Redis Client Error', err))
await client.on('error', (err) => console.log('Redis Client Error', err))
