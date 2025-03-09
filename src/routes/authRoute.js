'use strict';

import authController from '../controllers/authController';

async function authRoute(fastify, options) {
    fastify.post('/login', authController.login);
    fastify.post('/register', authController.register);
}

module.exports = authRoute;