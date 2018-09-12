import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import likeController from '../controllers/likeController';
import auth from '../middleware/auth';
import ratingValidation from '../middleware/ratingValidation';
import inputValidator from '../middleware/inputValidator';
import reportValidation from '../middleware/reportValidation';
import usersValidations from '../middleware/usersValidations';
import checkParams from '../middleware/checkParams';
import { multerUploads } from '../config/multer/multerConfig';

const { reportArticle, rateArticle, create, like } = articleController;
const { addComment } = commentController;
const { validateArticle, validateComments } = inputValidator;
const { validateLikeObject } = usersValidations;

const {
  validArticleId,
  validateRating,
  validateObject,
  validateUser
} = ratingValidation;
// TODO, varlidateArticleId is to be added when rate articles feature has been merged to develop.
const {
  validateViolation,
  validateRequestObject
} = reportValidation;

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
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
articleRoutes.post('/', auth, multerUploads, validateArticle, create);
articleRoutes.post('/:articleId/:likeType', auth, checkParams.id, checkParams.likeType, like);
articleRoutes.post(
  '/:articleId/report',
  auth,
  validateRequestObject,
  validateViolation,
  reportArticle
);

export default articleRoutes;
