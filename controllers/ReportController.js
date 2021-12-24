import {
    MYSQL
} from '../config/database.js'
import resp_code from '../src/libs/response/response_code.js'
import dotenv from 'dotenv'
dotenv.config()

//Redis
import { get_from_redis, push_to_redis } from '../src/libs/redis/connect.js'

export async function CobaRedis(req, res) {
    let user_id = req.params.user_id
    let from_redis = await get_from_redis(user_id)
    if(from_redis == null){
        var query = `SELECT * FROM file_upload2 WHERE user_id = ?`
        const file_upload2 = await MYSQL.query(query, [user_id])
        const result_file_upload2 = JSON.parse(JSON.stringify(file_upload2))
        let push_redis = await push_to_redis(user_id,result_file_upload2)
        res.json(result_file_upload2)
    } else {
        res.json(from_redis)
    }
}