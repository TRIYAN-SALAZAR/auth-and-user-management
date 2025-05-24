'use strict';

import userController from '../controllers/userController.js';

function userRoute(server, options) {
    server.put('/change-password', userController.changePasswordController);
    server.put('/change-email', userController.changeEmailController);
    server.put('/change-name', userController.changeNameController);
    server.put('/change-profile-picture', userController.changeProfilePictureController);
    server.get('/user/:userid', userController.getDataUserController);
    server.get('/users', userController.getAllUsers);
}

export default userRoute;