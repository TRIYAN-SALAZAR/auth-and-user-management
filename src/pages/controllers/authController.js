'use strict';

import authService from '../services/authService.js';

const { login, signIn } = authService;

async function loginController(request, reply) {
    try {
        const server = request.server;
        const { email, password } = request.body;
        const token = await login(server, email, password);

        reply.send({ message: "Successful Login", token: token });
    } catch (error) {
        reply.status(error.status).send({ message: error.message })
    }
}

async function signInController(request, reply) {
    try {
        const server = request.server;
        const token = await signIn(server, request.body);

        if (!token) throw new Error('Error to register');

        reply.send({ message: "User Registered", token });
    } catch (error) {
        reply.status(error.status).send({ description: error.message });
    }
}

export default { loginController, signInController };