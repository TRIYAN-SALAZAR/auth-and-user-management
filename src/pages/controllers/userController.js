'use strict';

import userService from '../services/userService.js';

const {
    changePassword,
    changeEmail,
    changeName,
    changeProfilePicture,
    getDataUser,
    obtainUsers
} = userService;

async function changePasswordController(request, reply) {
    try {
        const server = request.server;
        const data = request.body;
        const result = await changePassword(server, data);

        reply.send({
            message: result.message
        });
    } catch (error) {
        reply.status(error.status).send({ message: error.message });
    }
}

async function changeEmailController(request, reply) {
    try {
        const server = request.server;
        const data = request.body;

        const result = await changeEmail(server, data);

        reply.send({ message: result.message });
    } catch (error) {
        reply.status(error.status).send({ message: error.message })
    }
}

async function changeNameController(request, reply) {
    try {
        const server = request.server;
        const data = request.body;
        const result = await changeName(server, data);

        reply.send({ message: result.message });
    } catch (error) {

    }
}

async function changeProfilePictureController(request, reply) {
    reply.send({ message: "User change profile picture" });
}

async function getDataUserController(request, reply) {
    try {
        const server = request.server;
        const user = await getDataUser(server, request.params.userid);
        reply.send({ message: "User get data", user: user });

    } catch (error) {
        reply.status(error.status).send(error);
    }
}

async function getAllUsers(request, reply) {
    try {
        const server = request.server;
        const USERS = await obtainUsers(server);
        reply.send({ message: "Get users succesfully", users: USERS });
    } catch (error) {
        console.log(error);
        reply.status(500).send({ message: "what's happened wrong", error });
    }
}

export default {
    changePasswordController,
    changeEmailController,
    changeNameController,
    changeProfilePictureController,
    getDataUserController,
    getAllUsers
};