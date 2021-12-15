import express from 'express'
const router = express.Router()
import * as AuthController from '../controllers/AuthController.js'
import { VerifyToken } from '../src/auth/jwt/useJwt.js'

express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
    configure(router);
    this.use(path, middleware, router);
    return router;
}

// router api
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.prefix('/auth', VerifyToken, async function (user) {
    user.get('/getDataUser', AuthController.getDataUser);
    user.get('/getData/:id', AuthController.getData_params);
});

export default router