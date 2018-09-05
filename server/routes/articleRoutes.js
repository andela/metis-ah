import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import auth from '../middleware/auth';
import ratingValidation from '../middleware/ratingValidation';
import inputValidator from '../middleware/inputValidator';

const { rateArticle, create } = articleController;
const { addComment } = commentController;
const { validateArticle, validateComments } = inputValidator;
const {
  validArticleId,
  validateRating,
  validateObject,
  validateUser
} = ratingValidation;

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
articleRoutes.post('/', auth, validateArticle, create);
articleRoutes.post('/:articleId', auth, validArticleId, validateComments, addComment);
articleRoutes.post(
  '/:articleId/rate',
  auth,
  validArticleId,
  validateObject,
  validateRating,
  validateUser,
  rateArticle
);


export default articleRoutes;
