'use strict';

import jwt from '../../utils/jwt.js';
import ObtainSeedData from '../../tests/seed/obtainData.js';
import { generateID } from '../../utils/idGenerate.js';
import Hash from '../../utils/hash.js';
import { UserSchema } from '../../server.js';

async function changePassword(id, password, newPassword, ConfirmNewPassword) {
    try {
        const user = await UserSchema.findOne({ where: { id } });
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
        const user = UserSchema.findOne({ where: { id } });
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
        const user = UserSchema.findOne({ where: { id } });
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
        const user = UserSchema.findOne({ where: { id } });
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
        const user = await UserSchema.findOne({ where: { id }, attributes: ['first_name', 'last_name', 'age'] });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        return {message: 'Get Data Succesfully', user: user.dataValues};
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
        const users = await UserSchema.findAll({ attributes: ['id', 'first_name', 'last_name', 'age'] });
        
        return users.map(user => user.dataValues);
    } catch (error) {
        console.error('An unexpected error occurred while fetching users:', error);
        error = new Error('Internal Server Error');
        error.status = 500;

        throw error;
    }
}

/**
 * This function, is specifically intended for development purposes to seed initial user data into the database. 
 * It is not designed for production use and serves as a provisional utility to facilitate API testing and development. 
 * In future versions, this function will likely be replaced or removed as part of the production-ready implementation.
 */
async function loadSeedOfUsers() {
    try {
        const USER_DATA = await ObtainSeedData();
        USER_DATA.forEach(async (user) => {
            await UserSchema.create({
                id: generateID(),
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                email: user.email,
                password: Hash.hashPassword('123456')
            });
        });

        return USER_DATA;
    } catch (error) {
        console.error('----------------------------\n')
        console.error('Error loading seed data:', error.message);
        throw new Error('Error loading seed data: ' + error.message);
    }
}

export default {
    changePassword,
    changeEmail,
    changeName,
    changeProfilePicture,
    getDataUser,
    loadSeedOfUsers,
    obtainUsers
}