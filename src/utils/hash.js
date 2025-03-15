'use strict';
import bcrypt from "bcryptjs";

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(9);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

function checkHashToPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

export default { hashPassword, checkHashToPassword };