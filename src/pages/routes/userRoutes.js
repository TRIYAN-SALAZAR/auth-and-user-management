'use strict';

import userController from '../controllers/userController.js';

function userRoute(fastify, options) {
    fastify.put('/change-password', userController.changePasswordController);
    fastify.put('/change-email', userController.changeEmailController);
    fastify.put('/change-name', userController.changeNameController);
    fastify.put('/change-profile-picture', userController.changeProfilePictureController);
    fastify.get('/user/:userid', userController.getDataUserController);
    fastify.get('/users', userController.getAllUsers);
    fastify.post('/seed', userController.postLoadDataUsers);
}

export default userRoute;