import express from 'express'
const router = express.Router()
import * as AuthController from '../controllers/AuthController.js'
import * as UploadController from '../controllers/UploadController.js'
import { VerifyToken } from '../src/auth/jwt/useJwt.js'

express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
    configure(router);
    this.use(path, middleware, router);
    return router;
}

// router api
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

// grouping router with jwt verify
router.prefix('/auth', VerifyToken, async function (user) {
    user.get('/getDataUser', AuthController.getDataUser);

    //Example Upload File
    user.post('/Upload', UploadController.Upload);
    user.post('/Upload2', UploadController.Upload2);
});

export default router