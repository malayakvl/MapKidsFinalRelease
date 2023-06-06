import * as express from 'express';
import authController from '../controllers/AuthController.js';

const authRoute = express.Router();

authRoute.use(express.json({
    inflate: true,
    limit: '512kb',
    strict: true
}));

authRoute.post('/login', authController.authLogin);
authRoute.post('/restorePassword', authController.restorePassword);
authRoute.post('/changePassword', authController.changePassword);
authRoute.get('/invitation/:hash', authController.getInvitation);
authRoute.get('/activate-hash/:hash', authController.activateHash);


export default authRoute;
