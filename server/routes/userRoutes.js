import express from 'express';
import auth from '../middleware/auth';
import userController from '../controllers/userController';
import usersValidations from '../middleware/usersValidations';

const { validateSignUp, validateLogin, validateNewPassword } = usersValidations;

const userRoutes = express.Router();

userRoutes.post('/auth/signup', validateSignUp, userController.signUp);
userRoutes.post('/auth/login', validateLogin, userController.login);
userRoutes.put('/verify/:token', auth, userController.verify);
userRoutes.get('/', auth, userController.allUsers);
userRoutes.post('/:userId/follow', auth, userController.follow);
userRoutes.delete('/:userId/unfollow', auth, userController.unfollow);
userRoutes.get('/followings', auth, userController.following);
userRoutes.post('/auth/reset-password', userController.resetPassword);
userRoutes.put('/auth/reset-password/:token', auth, validateNewPassword, userController.reset);
userRoutes.get('/statistics', auth, userController.getReadingStats);

export default userRoutes;
