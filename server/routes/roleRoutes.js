import express from 'express';
import auth from '../middleware/auth';
import roleValidator from '../middleware/roleValidator';
import roleController from '../controllers/roleController';

const roleRoutes = express.Router();
const { getRoles, postRoles } = roleController;
const { validateAdmin } = roleValidator;

roleRoutes.get(
  '/',
  auth,
  validateAdmin,
  getRoles
);
roleRoutes.post(
  '/',
  auth,
  validateAdmin,
  postRoles
);

export default roleRoutes;
