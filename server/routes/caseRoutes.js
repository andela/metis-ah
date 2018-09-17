import express from 'express';
import auth from '../middleware/auth';
import caseController from '../controllers/casesController';
import roleValidator from '../middleware/roleValidator';

const {
  getCases,
  resolveCase
} = caseController;
const {
  isAdmin
} = roleValidator;

const caseRoutes = express.Router();

caseRoutes.get(
  '/',
  auth,
  isAdmin,
  getCases
);
caseRoutes.put(
  '/:caseId/resolve',
  auth,
  isAdmin,
  resolveCase
);

export default caseRoutes;
