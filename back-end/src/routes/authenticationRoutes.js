import express from 'express';
import AuthController from '../controllers/authenticationController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/refresh', authController.refreshToken.bind(authController));
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/signin', (req, res) => authController.signin(req, res));
router.get('/me', (req, res) => authController.getCurrentUser(req, res));
router.put('/update', (req, res) => authController.updateUser(req, res));


export default router;