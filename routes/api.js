import express from 'express'
const router = express.Router()
import * as AuthController from '../controllers/AuthController.js'
import * as UploadController from '../controllers/UploadController.js'
import * as ReportController from '../controllers/ReportController.js'
import { VerifyTokenRedis } from '../src/auth/jwt/useJwt.js'

express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
    configure(router)
    this.use(path, middleware, router)
    return router
}

// router api
router.post('/login', AuthController.login);
router.post('/register', AuthController.register)
router.post('/email_verification', AuthController.register_verification)

// grouping router with jwt verify
router.prefix('/auth', VerifyTokenRedis, async function (user) {
    user.post('/Logout', AuthController.Logout)
    user.get('/getDataUser', AuthController.getDataUser)

    //Example Upload File
    user.post('/Upload', UploadController.Upload)
    user.post('/Upload2', UploadController.Upload2)
    user.post('/UploadKTP', UploadController.UploadKTP)

    //
})

// Coba Ambil Data Dari Redis
router.get('/CobaRedis/:user_id', ReportController.CobaRedis)

export default router