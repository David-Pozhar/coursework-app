import express from 'express';
import { checkAuth, checkIsAdmin } from '../utils/index.js';
import upload from '../utils/upload.js';
import UploadController from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload-avatar', checkAuth, upload.avatar.single('image'), UploadController.uploadAvatar);
router.post('/upload-dish', checkAuth, checkIsAdmin, upload.dish.single('image'), UploadController.uploadDish);

export default router;
