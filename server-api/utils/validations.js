import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({
        min: 6,
    }),
];

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({
        min: 6,
    }),
    body('fullName', 'Enter a name').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid avatar link').optional().isURL(),
];

export const dishCreateValidation = [
    body('title', 'Enter the title of the dish').isLength({ min: 3 }).isString(),
    body('description', 'Enter a description of the dish').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];

export const categoryCreateValidation = [
    body('title', 'Enter the title of the category').isLength({ min: 3 }).isString(),
    body('description', 'Enter a description of the category').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];

export const orderCreateValidation = [
    body('orderItems', 'Enter the items of the order').isArray(),
];

export const orderUpdateValidation = [
    body('isPaid', 'Invalid type of isPaid field').isBoolean(),
];