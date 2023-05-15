import express from 'express';
import DishController from '../controllers/dishController.js';
import { handleValidationErrors, checkAuth, checkIsAdmin, dishCreateValidation } from '../utils/index.js';

const router = express.Router();

router.get('/dishes', DishController.getAll);
router.get('/dishes/:id', DishController.getOne);
router.post('/dishes', checkAuth, checkIsAdmin, dishCreateValidation, handleValidationErrors, DishController.create);
router.delete('/dishes/:id', checkAuth, checkIsAdmin, DishController.remove);
router.patch('/dishes/:id', checkAuth, checkIsAdmin, dishCreateValidation, handleValidationErrors, DishController.update);

export default router;
