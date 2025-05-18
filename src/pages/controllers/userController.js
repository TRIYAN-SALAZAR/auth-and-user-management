'use strict';

import userService from '../services/userService.js';

const { 
    changePassword, 
    changeEmail, 
    changeName, 
    changeProfilePicture, 
    getDataUser, 
    loadSeedOfUsers,
    obtainUsers
} = userService;

async function changePasswordController(request, reply) {
    try {
        const { id, password, newPassword, confirmNewPassword } = request.body;

        if (!id || !password || !newPassword || !confirmNewPassword) {
            return reply.status(400).send({
                success: false,
                message: 'Missing required fields: id, password, newPassword, confirmNewPassword'
            });
        }

        const result = await changePassword(id, password, newPassword, confirmNewPassword);
        reply.send({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.status || 500;
        const message = error.message || 'Internal Server Error';

        if (statusCode === 500) {
            request.log.error(error);
        }

        reply.status(statusCode).send({
            success: false,
            message
        });
    }
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
    try {
        const user = await getDataUser(request.params.userid);
        reply.send({ message: "User get data", user: user });

    } catch(error) {
        reply.status(404).send(error);
    }
}

async function getAllUsers(request, reply) {
    try {
        const USERS = await obtainUsers();
        reply.send({message: "Get users succesfully", users: USERS});
    } catch(error) {
        console.log(error);
        reply.status(500).send({message: "what's happened wrong", error});
    }
}

async function postLoadDataUsers() {
    try {
        const DATA = await loadSeedOfUsers();
        reply.send({ message: "Data load succesfully", data: DATA });
    } catch (error) {
        console.error('----------------------------\n')

        request.log.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
}

export default {
    changePasswordController,
    changeEmailController,
    changeNameController, 
    changeProfilePictureController, 
    getDataUserController, 
    postLoadDataUsers,
    getAllUsers
};