'use strict';

import authService from '../services/authService.js';

const { login, registerEmail } = authService;

async function loginController(request, reply) {
    try {
        const { email, password } = request.body;
        const token = await login(email, password);
        reply.send({ message: "Auth login", token: token });
    } catch (error) {
        reply.send({ message: error.message })
        console.error(error);
    }
}

async function registerController(request, reply) {
    try {
        const { email, password, firstName, lastName, age } = request.body;
        const token = await registerEmail({ email, password, firstName, lastName, age });

        if (!token) throw new Error('Error to register');

        reply.send({ message: "Auth register", token });
    } catch (error) {
        // reply.send({ message: error.message });
        console.error(error);
    }
}

export default { loginController, registerController };