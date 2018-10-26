import express from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';
import roleValidator from '../middleware/roleValidator';
import usersValidations from '../middleware/usersValidations';

const {
  validateSignUp,
  validateLogin,
  validateNewPassword,
  validInterest,
} = usersValidations;
const {
  isUser,
  isAdmin
} = roleValidator;

const userRoutes = express.Router();

userRoutes.put('/interests', auth, isUser, validInterest, userController.addInterests);
userRoutes.post('/auth/signup', validateSignUp, userController.signUp);
userRoutes.post('/auth/login', validateLogin, userController.login);
userRoutes.put('/verify/:token', auth, userController.verify);
userRoutes.get('/', auth, isAdmin, userController.allUsers);
userRoutes.post('/:userId/follow', auth, isUser, userController.follow);
userRoutes.delete('/:userId/unfollow', auth, isUser, userController.unfollow);
userRoutes.get('/followings', auth, isUser, userController.following);
userRoutes.post('/auth/reset-password', userController.resetPassword);
userRoutes.put('/auth/reset-password/:token', auth, validateNewPassword, userController.reset);
userRoutes.put('/update', auth, isUser, userController.updateProfile);
userRoutes.get('/:userId', auth, isUser, userController.getUserProfile);

export default userRoutes;
