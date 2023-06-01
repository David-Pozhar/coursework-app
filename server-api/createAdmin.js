import { default as db } from './utils/db.js';
import userService from './services/userService.js';

const USER_DATA = {
    email: 'admin@food.ordering.app',
    fullName: 'Admin',
    password: 'adminAdmin123!',
    isAdmin: true
}

async function create_user_admin() {
    try {
        const { userData, token } = await userService.register(USER_DATA);
        console.log({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
    }
}

create_user_admin();
