import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT

import api from './routes/api.js'

app.use(express.json())

// app.use('/api', api)

app.use('/api', api, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})

app.listen(PORT, () => {
    console.log('Server running on port : http://127.0.0.1:' + PORT)
})