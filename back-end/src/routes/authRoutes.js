import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/auth/refresh', authController.refreshToken.bind(authController));
router.post('/auth/signup', (req, res) => authController.signup(req, res));
router.post('/auth/signin', (req, res) => authController.signin(req, res));
router.get('/auth/me', (req, res) => authController.getCurrentUser(req, res));
router.put('/auth/update', (req, res) => authController.updateUser(req, res));


export default router;