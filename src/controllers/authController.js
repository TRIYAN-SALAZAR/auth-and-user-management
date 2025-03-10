'use strict';

import authService from '../services/authService.js';

const { login, registerEmail } = authService;

async function loginController(request, reply) {
    reply.send({ message: "Auth login" });
}

async function registerController(request, reply) {
    reply.send({ message: "Auth register" });
}

export default { loginController, registerController };