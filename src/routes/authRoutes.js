'use strict';

import authController from '../controllers/authController.js';

async function authRoute(fastify, options) {
    fastify.post('/login', authController.login);
    fastify.post('/register', authController.register);
}

export default authRoute;