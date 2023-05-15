import express from 'express';
import OrderController from '../controllers/orderController.js';
import {
    handleValidationErrors,
    checkAuth,
    checkIsAdmin,
    orderCreateValidation,
    orderUpdateValidation,
} from '../utils/index.js';

const router = express.Router();

router.get('/orders', checkAuth, OrderController.getAll);
router.get('/orders/:id', checkAuth, OrderController.getOne);
router.post('/orders', checkAuth, orderCreateValidation, handleValidationErrors, OrderController.create);
router.delete('/orders/:id', checkAuth, checkIsAdmin, OrderController.remove);
router.patch(
    '/orders/:id',
    checkAuth,
    checkIsAdmin,
    orderUpdateValidation,
    handleValidationErrors,
    OrderController.update
);

export default router;
