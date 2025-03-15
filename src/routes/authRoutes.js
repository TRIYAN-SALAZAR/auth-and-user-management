'use strict';

import authController from '../controllers/authController.js';

const opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        }
    }
}

function authRoute(fastify, options) {
    fastify.post('/login', opts,  authController.loginController);
    fastify.post('/register', opts, authController.registerController);
}

export default authRoute;