import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from '../config.js';
import UserModel from '../models/userModel.js';

const userService = {};

function getJwtToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            _isAdmin: user.isAdmin
        },
        config.JWT_SALT,
        {
            expiresIn: config.JWT_TOKEN_EXPIRES_IN,
        }
    );
}

userService.register = async function (body) {
    try {
        const password = body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: body.email,
            fullName: body.fullName,
            avatarUrl: body.avatarUrl,
            passwordHash: hash,
            isAdmin: !!body.isAdmin,
        });

        const user = await doc.save();
        const token = getJwtToken(user);
        const { passwordHash, ...userData } = user._doc;

        return { userData, token };
    } catch (err) {
        throw Error('Error while registering User: ' + err);
    }
};

userService.login = async function (body) {
    try {
        let error = false;
        const user = await UserModel.findOne({ email: body.email });

        if (!user) {
            error = true;
            return { error };
        }

        const isValidPass = await bcrypt.compare(body.password, user._doc.passwordHash);

        if (!isValidPass) {
            error = true;
            return { error };
        }

        const token = getJwtToken(user);
        const { passwordHash, ...userData } = user._doc;

        return { error, userData, token };
    } catch (err) {
        throw Error('Error while logging User: ' + err);
    }
};

userService.getUserById = async function (userId) {
    try {
        let error = false;
        const user = await UserModel.findById(userId);

        if (!user) {
            error = true;
            return { error };
        }

        const { passwordHash, ...userData } = user._doc;

        return { error, userData };
    } catch (err) {
        throw Error('Error while get User by token: ' + err);
    }
};

userService.getAll = async function (page, pageSize) {
    try {
        const totalCount = await UserModel.countDocuments().exec();
        const users = await UserModel.find().limit(pageSize).skip(pageSize * page).exec();

        return { users, totalCount };
    } catch (err) {
        throw Error('Error while getting all users: ' + err);
    }
};

export default userService;
