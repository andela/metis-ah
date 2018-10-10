import express from 'express';
import auth from '../middleware/auth';
import roleValidator from '../middleware/roleValidator';
import roleController from '../controllers/roleController';

const roleRoutes = express.Router();
const {
  getRoles,
  postRoles,
  putRole
} = roleController;
const {
  validateAdmin,
  checkPostProperties,
  checkPutProperties,
  validatePutPermissions,
  validatePostPermissions
} = roleValidator;

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
  checkPostProperties,
  validatePostPermissions,
  postRoles
);
roleRoutes.put(
  '/',
  auth,
  validateAdmin,
  checkPutProperties,
  validatePutPermissions,
  putRole
);

export default roleRoutes;
