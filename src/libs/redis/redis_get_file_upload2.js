import {
    client
} from '../../../src/libs/redis/connect.js'

export async function get_file_upload2_from_redis(payload) {
    const query = JSON.parse(JSON.stringify(payload))

    const hasil_redis = await client.get(query)
    return JSON.parse(hasil_redis)
}

export async function push_file_upload2_to_redis(payload,payload2) {
    const query = JSON.parse(JSON.stringify(payload))
    await client.set(query, JSON.stringify(payload2))
}