'use strict';

import authController from '../controllers/authController.js';

async function authRoute(fastify, options) {
    fastify.post('/login', authController.loginController);
    fastify.post('/register', authController.registerController);
}

export default authRoute;