'use strict';

import User from '../../schemas/userShema.js';
import jwt from '../../utils/jwt.js';
import IDs from '../../utils/idGenerate.js';
import Hash from '../../utils/hash.js';

async function login(email, password) {
    try {
        const user = await User.findOne({ where: { email } });
        const hash = user.password;

        if (!user || !Hash.checkHashToPassword(password, hash)) throw new Error('Invalid email or password');

        return jwt.sign({ id: user.id });

    } catch (error) {
        if (error.message === 'Invalid email or password') {
            return { error: error.message };
        }

        console.error(error);
    }
}

async function registerEmail(dataUser) {
    try {
        const { email, password, firstName, lastName, age } = dataUser;
        const hash = Hash.hashPassword(password);
        const id = IDs.generate();
        const user = await User.create({ id, email, password: hash, first_name: firstName, last_name: lastName, age });

        return jwt.sign({ id: user.id });

    } catch (error) {
        console.error(error);
    }
}

export default { login, registerEmail };