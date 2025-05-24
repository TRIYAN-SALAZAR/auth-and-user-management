'use strict';

import jwt from '../../utils/jwt.js';
import ObtainSeedData from '../../tests/seed/obtainData.js';
import { generateID } from '../../utils/idGenerate.js';
import Hash from '../../utils/hash.js';
import { User } from '../../server.js';

async function changePassword(id, password, newPassword, ConfirmNewPassword) {
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        if (newPassword !== ConfirmNewPassword) {
            const error = new Error('Passwords do not match');
            error.status = 400;
            throw error;
        }

        if (!Hash.checkHashToPassword(password, user.password)) {
            const error = new Error('Incorrect current password');
            error.status = 401;
            throw error;
        }

        const hashedPassword = Hash.hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();

        return { message: 'Password updated successfully' };
    } catch (error) {
        if (!error.status) {
            console.error('Unexpected error in changePassword:', error);
            error = new Error('Internal Server Error');
            error.status = 500;
        }
        throw error;
    }
}

async function changeEmail(id, email) {
    try {
        const user = User.findOne({ where: { id } });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        user.email = email;
        await user.save();
        return { message: 'Email updated successfully' };
    } catch (error) {
        if (!error.status) {
            console.error('Internal Server Error', error);
            error = new Error('Internal Server Error');
            error.status = 500;
        }

        throw error;
    }
}

async function changeName(id, name) {
    try {
        const user = User.findOne({ where: { id } });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        user.name = name;
        await user.save();
        return { message: 'Name updated successfully' };
    } catch (error) {
        if (!error.status) {
            console.error(error);
            error = new Error('Internal Server Error');
            error.status = 500;
        }

        throw error;
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

async function getDataUser(id) {
    try {
        const user = await User.findOne({
            where: { id },
            attributes: ['first_name', 'last_name', 'age']
        });

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        return {
            message: 'Get Data Succesfully',
            user: user.dataValues
        };
    } catch (error) {
        if (!error.status) {
            error = new Error('Internal Server Error');
            error.status = 500;
        }

        throw error;
    }
}

async function obtainUsers() {
    try {
        const users = await User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'age']
        });

        return users.map(user => user.dataValues);
    } catch (error) {
        console.error('An unexpected error occurred while fetching users:', error);
        error = new Error('Internal Server Error');
        error.status = 500;

        throw error;
    }
}

export default {
    changePassword,
    changeEmail,
    changeName,
    changeProfilePicture,
    getDataUser,
    obtainUsers
}