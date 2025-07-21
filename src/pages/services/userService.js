'use strict';

import Hash from '../../utils/hash.js';

async function changePassword(server, { id, password, newPassword, confirmNewPassword }) {
    try {
        const User = server.schema.User;

        if (!id || !password || !newPassword || !confirmNewPassword) {
            const error = new Error('Missing required fields: id, password, newPassword, confirmNewPassword');
            error.status = 400;
            throw error;
        }

        if (newPassword !== confirmNewPassword) {
            const error = new Error('Passwords do not match');
            error.status = 400;
            throw error;
        }

        const user = await User.findOne({ where: { id } });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
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

async function changeEmail(server, { id, email }) {
    try {
        const User = server.schema.User;
        const user = User.update({ email }, { where: { id } });
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

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

async function changeName(server, { id, first_name, last_name }) {
    try {
        const User = server.schema.User;

        if (!id) {
            const error = new Error("Missing userID");
            error.status = 404;
            throw error;
        }

        if (!first_name && !last_name) {
            const error = new Error("Missing Data");
            error.status = 404;
            throw error;
        }

        const user = User.findOne({ where: { id } });

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;

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

async function changeProfilePicture(server, { id, profilePicture }) {
    try {
        const User = server.schema.User;
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

async function getDataUser(server, id) {
    try {
        if (!id) {
            const error = new Error("Missing User ID");
            error = 404;
            throw error;
        }

        const User = server.schema.User;
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

async function obtainUsers(server) {
    try {
        const User = server.schema.User;
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