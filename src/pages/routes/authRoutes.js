'use strict';

import authController from '../controllers/authController.js';

const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                    message: { type: 'string' }
                }
            }
        }
    }
}

function authRoutes(fastify, options) {
    fastify.post('/login', opts,  authController.loginController);
    fastify.post('/register', opts, authController.registerController);
}

export default authRoutes;