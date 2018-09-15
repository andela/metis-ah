import express from 'express';
import auth from '../middleware/auth';
import caseController from '../controllers/casesController';

const {
  getCases,
  resolveCase
} = caseController;

const caseRoutes = express.Router();

caseRoutes.get(
  '/',
  auth,
  getCases
);
caseRoutes.put(
  '/:caseId/resolve',
  auth,
  resolveCase
);

export default caseRoutes;
