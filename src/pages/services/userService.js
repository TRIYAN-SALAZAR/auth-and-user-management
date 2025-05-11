'use strict';

import jwt from '../../utils/jwt.js';
import ObtainSeedData from '../../tests/seed/obtainData.js';
import { generateID } from '../../utils/idGenerate.js';
import Hash from '../../utils/hash.js';
import { UserSchema } from '../../server.js';

async function changePassword(id, password) {
    try {
        const user = UserSchema.findOne({ where: { id } });
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
        const user = UserSchema.findOne({ where: { id } });
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
        const user = UserSchema.findOne({ where: { id } });
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

async function getDataUser(id, data) {
    try {
        const user = await UserSchema.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        const { first_name, last_name, age } = data;

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

async function obtainUsers() {
    try {
        const users = await UserSchema.findAll({attributes: ['id', 'first_name', 'last_name', 'age']});

        return users.map(user => user.dataValues);
    } catch (error) {
        throw new Error(error.message);
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