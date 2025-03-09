'use strict';

import authService from '../services/authService.js';

async function login(request, reply) {
    reply.send({ message: "Auth login" });
}

async function register(request, reply) {
    reply.send({ message: "Auth register" });
}

export default { login, register };