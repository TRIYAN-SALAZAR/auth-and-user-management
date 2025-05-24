'use strict';

import authService from '../services/authService.js';

const { login, registerEmail } = authService;

async function loginController(request, reply) {
    try {
        const { email, password } = request.body;
        const token = await login(email, password);

        reply.send({ message: "Successful Login", token: token });
    } catch (error) {
        reply.status(error.status).send({ message: error.message })
    }
}

async function registerController(request, reply) {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            age
        } = request.body;
        const token = await registerEmail({ email, password, firstName, lastName, age });

        if (!token) throw new Error('Error to register');

        reply.send({ message: "User Registered", token });
    } catch (error) {
        reply.status(error.status).send({ description: error.message });
    }
}

export default { loginController, registerController };