import express from 'express';

import users from '../controllers/user';
import middleware from '../middleware/usersValidations';

const { signUp } = users;
const { validateSignUp } = middleware;

const router = express.Router();

router.post('/auth/signup', validateSignUp, signUp);

export default router;
