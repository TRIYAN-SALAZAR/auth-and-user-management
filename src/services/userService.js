'use strict';

import User from '../schemas/userShema.js';
import jwt from '../utils/jwt.js';

async function changePassword(id, password) {}

async function changeEmail(id, email) {}

async function changeName(id, name) {}

async function changeProfilePicture(id, profilePicture) {}

async function getDataUser(id) {}

export default { changePassword, changeEmail, changeName, changeProfilePicture, getDataUser };