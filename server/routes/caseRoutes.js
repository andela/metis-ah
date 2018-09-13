import express from 'express';
import auth from '../middleware/auth';
import caseController from '../controllers/casesController';

const {
  getCases
} = caseController;

const caseRoutes = express.Router();

caseRoutes.get(
  '/',
  auth,
  getCases
);

export default caseRoutes;
