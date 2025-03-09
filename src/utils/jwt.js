'use strict';

import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

function sign(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function verify(token) {
    return jwt.verify(token, secret);
}

export default { sign, verify };