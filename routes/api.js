import express from 'express'
const router = express.Router()
import * as AuthController from '../controllers/AuthController.js'
import * as UploadController from '../controllers/UploadController.js'
import * as ReportController from '../controllers/ReportController.js'
import { VerifyToken,VerifyTokenRedis,JwtRedisLogout } from '../src/auth/jwt/useJwt.js'

express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
    configure(router)
    this.use(path, middleware, router)
    return router
}

// router api
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/email_verification', AuthController.register_verification)

// grouping router with jwt verify
router.prefix('/auth', VerifyToken, async function (user) {
    user.get('/getDataUser', AuthController.getDataUser)

    //Example Upload File
    user.post('/Upload', UploadController.Upload)
    user.post('/Upload2', UploadController.Upload2)
    user.post('/UploadKTP', UploadController.UploadKTP)

    //
})

// Route JWT Redis
router.prefix('/authredis', VerifyTokenRedis, async function (userredis) {
    userredis.get('/getDataUser', AuthController.getDataUser)

    //Example Upload File
    userredis.post('/Upload', UploadController.Upload)
    userredis.post('/Upload2', UploadController.Upload2)
    userredis.post('/UploadKTP', UploadController.UploadKTP)
    userredis.post('/logout', AuthController.logout);

    //
})
// Logout JWT Redis
router.prefix('/logout', JwtRedisLogout, async function (out) {
    out.post('/', AuthController.logout);
})

// Redis Api
router.get('/CobaRedis/:user_id', ReportController.CobaRedis)

export default router