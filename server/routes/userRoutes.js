import express from 'express';
import userController from '../controllers/userController';
import auth from '../middleware/auth';
import roleValidator from '../middleware/roleValidator';
import usersValidations from '../middleware/usersValidations';

const {
  validateSignUp, validateLogin, validateNewPassword, validInterest
} = usersValidations;
const {
  signUp, login, verify,
  allUsers, follow, unfollow,
  following, resetPassword,
  reset, addInterests, updateProfile,
  getUserProfile
} = userController;

const {
  isUser,
  isAdmin
} = roleValidator;

const userRoutes = express.Router();

userRoutes.put('/interests', auth, isUser, validInterest, addInterests);
userRoutes.post('/auth/signup', validateSignUp, signUp);
userRoutes.post('/auth/login', validateLogin, login);
userRoutes.put('/verify/:token', auth, verify);
userRoutes.get('/', auth, isAdmin, allUsers);
userRoutes.post('/:userId/follow', auth, follow);
userRoutes.delete('/:userId/unfollow', auth, unfollow);
userRoutes.get('/followings', auth, following);
userRoutes.post('/auth/reset-password', resetPassword);
userRoutes.put('/auth/reset-password/:token', auth, validateNewPassword, reset);
userRoutes.put('/update', auth, isUser, updateProfile);
userRoutes.get('/:userId', auth, isUser, getUserProfile);

export default userRoutes;
