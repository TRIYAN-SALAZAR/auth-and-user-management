'use strict';

import User from '../models/user';
import jwt from '../utils/jwt';

async function login(email, password) {
    const user = await User.findOne({ where: { email } });

    if(!user || !user.comparePassword(password)) {
        throw new Error('Invalid email or password');
    }

    return jwt.sign({ id: user.id });
}

async function registerEmail(email, password) {
    const user = await User.create({ email, password });

    return jwt.sign({ id: user.id });
}

export default { login, registerEmail };