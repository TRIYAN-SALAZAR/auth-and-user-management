'use strict';

import jwt from 'jsonwebtoken';

/*
    Temporal solution to be able to sign the token with the key
*/

function sign(payload) {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: '9h' });
}

function verify(token) {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
}

export default { sign, verify };