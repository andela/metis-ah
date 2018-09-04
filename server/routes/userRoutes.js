import express from 'express';

import users from '../controllers/user';
import usersValidations from '../middleware/usersValidations';

const { signUp } = users;
const { validateSignUp } = usersValidations;

const router = express.Router();

router.post('/auth/signup', validateSignUp, signUp);

export default router;
