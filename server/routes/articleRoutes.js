import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import likeController from '../controllers/likeController';
import auth from '../middleware/auth';
import ratingValidation from '../middleware/ratingValidation';
import inputValidator from '../middleware/inputValidator';
import usersValidations from '../middleware/usersValidations';
import checkParams from '../middleware/checkParams';

const { rateArticle, create } = articleController;
const { addComment } = commentController;
const { validateArticle, validateComments } = inputValidator;
const { validateLikeObject } = usersValidations;

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
  '/:articleId/comments/like',
  auth,
  validateLikeObject,
  likeController
);
articleRoutes.post(
  '/:articleId/rate',
  auth,
  validArticleId,
  validateObject,
  validateRating,
  validateUser,
  rateArticle
);
articleRoutes.post('/', auth, inputValidator.validateArticle, articleController.create);
articleRoutes.post('/:articleId/:likeType', auth, checkParams.id, checkParams.likeType, articleController.like);

export default articleRoutes;
