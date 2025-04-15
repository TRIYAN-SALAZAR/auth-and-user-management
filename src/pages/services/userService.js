'use strict';

import User from '../../schemas/userShema.js';
import jwt from '../../utils/jwt.js';

async function changePassword(id, password) {
    try {
        const user = User.findOne({ where: { id } });
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

async function changeEmail(id, email) {
    try {
        const user = User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }

        user.email = email;
        await user.save();
        return { message: 'Email updated successfully' };
    } catch (error) {
        if (error.message === 'User not found') {
            return { error: error.message };
        }

        console.error(error);
    }
}

async function changeName(id, name) {
    try {
        const user = User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }

        user.name = name;
        await user.save();
        return { message: 'Name updated successfully' };
    } catch (error) {
        if (error.message === 'User not found') {
            return { error: error.message };
        }

        console.error(error);
    }
}

async function changeProfilePicture(id, profilePicture) {
    try {
        const user = User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }

        user.profilePicture = profilePicture;
        await user.save();
        return { message: 'Profile picture updated successfully' };
    } catch (error) {
        if (error.message === 'User not found') {
            return { error: error.message };
        }

        console.error(error);
    }
}

    async function getDataUser(id, data) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                throw new Error('User not found');
            }
            const {first_name, last_name, age} = data;

            user.first_name = first_name;
            user.last_name = last_name;
            user.age = age;

            await user.save();
            return { message: 'User data updated successfully' };
        } catch (error) {
            if (error.message === 'User not found') {
                return { error: error.message };
            }
            console.error(error);
        }
    }

    export default { changePassword, changeEmail, changeName, changeProfilePicture, getDataUser }