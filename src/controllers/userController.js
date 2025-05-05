'use strict';

import userService from '../pages/services/userService.js';

const { changePassword, changeEmail, changeName, changeProfilePicture, getDataUser } = userService;

async function changePasswordController(request, reply) {
    reply.send({ message: "User change password" });
}

async function changeEmailController(request, reply) {
    reply.send({ message: "User change email" });
}

async function changeNameController(request, reply) {
    reply.send({ message: "User change name" });
}

async function changeProfilePictureController(request, reply) {
    reply.send({ message: "User change profile picture" });
}

async function getDataUserController(request, reply) {
    reply.send({ message: "User get data" });
}

export default { changePasswordController, changeEmailController, changeNameController, changeProfilePictureController, getDataUserController };