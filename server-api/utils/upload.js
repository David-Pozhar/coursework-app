import fs from 'fs';
import multer from 'multer';
import config from '../config.js';

function mkDirIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}

function getUniqueFileName(originalFileName) {
    const uniqueFileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniqueFileName + '.' + originalFileName.split('.').pop();
}

function removeFile(fileName) {
    fs.unlink('.' + fileName, (err) => {
        if (err) {
            console.log('Can\'t delete file ' + fileName + '. Error: ' + err);
        }
        console.log('Successfully deleted ' + fileName);
    });
}

const avatarStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        mkDirIfNotExists(config.USER_AVATAR_FOLDER);
        cb(null, config.USER_AVATAR_FOLDER);
    },
    filename: (_, file, cb) => {
        cb(null, getUniqueFileName(file.originalname));
    },
});

const dishStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        mkDirIfNotExists(config.DISH_IMAGE_FOLDER);
        cb(null, config.DISH_IMAGE_FOLDER);
    },
    filename: (_, file, cb) => {
        cb(null, config.SAVE_ORIGINAL_DISH_FILENAME ? file.originalname : getUniqueFileName(file.originalname));
    },
});

const upload = {
    avatar: multer({ storage: avatarStorage }),
    dish: multer({ storage: dishStorage }),
    remove: removeFile
};

export default upload;
