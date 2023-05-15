import config from '../config.js';
import userService from '../services/userService.js';
import upload from '../utils/upload.js';

const UploadController = {};

UploadController.uploadAvatar = async (req, res) => {
    const result = { url: '' };
    
    if (req.file.filename) {
        result.url = `/${config.USER_AVATAR_FOLDER}/${req.file.filename}`;

        // delete old avatar
        const { userData } = await userService.getUserById(req.userId);
        
        if (userData && userData.avatarUrl) {
            upload.remove(userData.avatarUrl);
        }
    }

    res.json(result);
};

UploadController.uploadDish = (req, res) => {
    const result = req.file.filename ? { url: `/${config.DISH_IMAGE_FOLDER}/${req.file.filename}` } : { url: '' }
    res.json(result);
};

export default UploadController;
