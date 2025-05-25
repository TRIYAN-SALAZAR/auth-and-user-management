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

function authRoutes(server, options) {
    server.post('/login', opts,  authController.loginController);
    server.post('/signin', opts, authController.signInController);
}

export default authRoutes;