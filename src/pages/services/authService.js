'use strict';

import { User } from '../../server.js';
import jwt from '../../utils/jwt.js';
import { generateID } from '../../utils/idGenerate.js';
import Hash from '../../utils/hash.js';

async function login(email, password) {
    try {
        const user = await User.findOne({
            where: { email },
            attributes: ['id', 'first_name', 'password']
        });
        const hash = user.password;
        const isPasswordCorrect = Hash.checkHashToPassword(password, hash);

        if (!user || !isPasswordCorrect) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ id: user.id, name: user.first_name })

        return token;
    } catch (error) {
        if (!error.status) {
            error = new Error('Internal Server Error');
            error.status = 500;
        }

        console.error(error);
        throw error;
    }
}

async function registerEmail(dataUser) {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            age
        } = dataUser;

        if(!email || !password || !firstName || !lastName || !age) {
            const error = new Error('Missing Data');
            error.status = 400;
            throw error;
        }

        const hash = Hash.hashPassword(password);
        const id = generateID();
        const user = await User.create({ 
            id,
            email,
            password: hash,
            first_name: firstName,
            last_name: lastName,
            age
        });
        const token = jwt.sign({ id: user.id, name: user.name });

        return token;

    } catch (error) {
        if(!error.status) {
            const errorMessage = error.errors[0].message 
            error = new Error(errorMessage);
            error.status = 500;
        }

        console.error(error);
        throw error;
    }
}

export default { login, registerEmail };