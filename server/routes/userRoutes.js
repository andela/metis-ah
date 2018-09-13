import express from 'express';
import userController from '../controllers/userController';

import auth from '../middleware/auth';
import usersValidations from '../middleware/usersValidations';

const { validateSignUp, validateLogin } = usersValidations;

const userRoutes = express.Router();

userRoutes.post('/auth/signup', validateSignUp, userController.signUp);
userRoutes.post('/auth/login', validateLogin, userController.login);
userRoutes.put('/verify/:token', auth, userController.verify);
userRoutes.get('/', auth, userController.allUsers);
userRoutes.post('/:userId/follow', auth, userController.follow);
userRoutes.delete('/:userId/unfollow', auth, userController.unfollow);
userRoutes.get('/followings', auth, userController.following);

export default userRoutes;
