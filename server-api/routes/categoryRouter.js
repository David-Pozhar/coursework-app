import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import { handleValidationErrors, checkAuth, checkIsAdmin, categoryCreateValidation } from '../utils/index.js';

const router = express.Router();

router.get('/categories', CategoryController.getAll);
router.get('/categories/:id', CategoryController.getOne);
router.post('/categories', checkAuth, checkIsAdmin, categoryCreateValidation, handleValidationErrors, CategoryController.create);
router.delete('/categories/:id', checkAuth, checkIsAdmin, CategoryController.remove);
router.patch('/categories/:id', checkAuth, checkIsAdmin, categoryCreateValidation, handleValidationErrors, CategoryController.update);

export default router;
