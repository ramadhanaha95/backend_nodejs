import {
    MYSQL
} from '../config/database.js'
import resp_code from '../src/libs/response/response_code.js'
import dotenv from 'dotenv'
dotenv.config()

//Redis
import { get_file_upload2_from_redis, push_file_upload2_to_redis } from '../src/libs/redis/redis_get_file_upload2.js'

export async function CobaRedis(req, res) {
    let user_id = req.params.user_id
    let from_redis = await get_file_upload2_from_redis(user_id)
    if(from_redis == "redis_error"){
        var query = `SELECT * FROM file_upload2 WHERE user_id = ?`
        const file_upload2 = await MYSQL.query(query, [user_id])
        //console.log(file_upload2)
        return res.json(file_upload2)
    } else {
        if(from_redis == null){
            var query = `SELECT * FROM file_upload2 WHERE user_id = ?`
            const file_upload2 = await MYSQL.query(query, [user_id])
            const result_file_upload2 = JSON.parse(JSON.stringify(file_upload2))
            let push_redis = await push_file_upload2_to_redis(user_id,result_file_upload2)
            //console.log(file_upload2)
            return res.json(file_upload2)
        } else {
            //console.log(from_redis)
            return res.json(from_redis)
        }
    }
}