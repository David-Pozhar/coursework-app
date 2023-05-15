import express from 'express';
import UserController from '../controllers/userController.js';
import { handleValidationErrors, checkAuth, checkIsAdmin, registerValidation, loginValidation } from '../utils/index.js';

const router = express.Router();

router.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
router.get('/auth/me', checkAuth, UserController.getMe);
router.get('/users', checkAuth, checkIsAdmin, UserController.getAll);

export default router;
