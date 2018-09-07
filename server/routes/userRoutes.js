import express from 'express';
import userController from '../controllers/userController';
import usersValidations from '../middleware/usersValidations';

const { validateSignUp, validateLogin } = usersValidations;

const userRoutes = express.Router();

userRoutes.post('/auth/signup', validateSignUp, userController.signUp);
userRoutes.post('/auth/login', validateLogin, userController.login);

export default userRoutes;
