'use strict';

import User from '../schemas/userShema.js';
import jwt from '../utils/jwt.js';

async function changePassword(id, password) {
    try {
        const user = User.findOne({where: { id }});
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await jwt.hashPassword(password);

        user.password = hashedPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    } catch (error) {
        console.error(error);
    }
}

async function changeEmail(id, email) {}

async function changeName(id, name) {}

async function changeProfilePicture(id, profilePicture) {}

async function getDataUser(id) {}

export default { changePassword, changeEmail, changeName, changeProfilePicture, getDataUser }