import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
//import https from 'https'
//import fs from 'fs'
dotenv.config()
const limiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const app = express()

const PORT = process.env.PORT

import api from './routes/api.js'
app.use(cors())
app.use(express.json())
app.use(limiter)

// app.use('/api', api)

app.use('/api', api, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})
app.listen(PORT, () => {
    console.log('Server running on port : http://127.0.0.1:' + PORT)
})

//Apa Bila Memerlukan SSL

// var privateKey = fs.readFileSync('./src/ssl/CA/localhost/localhost.decrypted.key')
// var certificate = fs.readFileSync('./src/ssl/CA/localhost/localhost.crt')
// https.createServer({
//     key: privateKey,
//     cert: certificate
// },app).listen(PORT, () => {
//     console.log('Server running on port : http://127.0.0.1:' + PORT)
// })