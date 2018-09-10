import express from 'express';
import auth from '../middleware/auth';
import articleController from '../controllers/articleController';
import ratingValidation from '../middleware/ratingValidation';
import inputValidator from '../middleware/inputValidator';
import userRoutes from './userRoutes';

const {
  rateArticle,
  create
} = articleController;
const {
  validArticleId,
  validateRating,
  validateObject,
  validateUser
} = ratingValidation;
const {
  validateArticle
} = inputValidator;

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
articleRoutes.post('/', auth, validateArticle, create);
articleRoutes.post('/:articleID/rate',
  auth,
  validArticleId,
  validateObject,
  validateRating,
  validateUser,
  rateArticle);

export default articleRoutes;
