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

async function getAllUsers(request, reply) {
    try {
        const USERS = await obtainUsers();
        reply.send({message: "Get users succesfully", users: USERS});
    } catch(error) {
        reply.status(500).send({error: "what's happened wrong", error});
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