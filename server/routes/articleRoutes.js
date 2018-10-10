import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import likeController from '../controllers/likeController';
import searchController from '../controllers/searchController';
import auth from '../middleware/auth';
import ratingValidation from '../middleware/ratingValidation';
import inputValidator from '../middleware/inputValidator';
import reportValidation from '../middleware/reportValidation';
import usersValidations from '../middleware/usersValidations';
import roleValidator from '../middleware/roleValidator';
import checkParams from '../middleware/checkParams';
import { multerUploads } from '../config/multer/multerConfig';
import paginationParamsValidations from '../middleware/paginationParamsValidations';

const {
  reportArticle,
  rateArticle,
  create,
  like,
  getArticles
} = articleController;
const { addComment } = commentController;
const { validateArticle, validateComments } = inputValidator;
const { validateLikeObject } = usersValidations;
const {
  validArticleId,
  validateRating,
  validateObject,
  validateUser
} = ratingValidation;
const {
  validateViolation,
  validateRequestObject,
} = reportValidation;
const {
  isUser
} = roleValidator;

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
articleRoutes.get('/', auth, paginationParamsValidations, isUser, getArticles);
articleRoutes.post('/:articleId', auth, validArticleId, validateComments, isUser, addComment);
articleRoutes.post(
  '/:articleId/comments/like',
  auth,
  validateLikeObject,
  isUser,
  likeController
);
articleRoutes.post(
  '/:articleId/rate',
  auth,
  validArticleId,
  validateObject,
  validateRating,
  validateUser,
  isUser,
  rateArticle
);
articleRoutes.post('/', auth, multerUploads, validateArticle, isUser, create);
articleRoutes.post('/:articleId/:likeType', auth, checkParams.id, checkParams.likeType, isUser, like);
articleRoutes.post(
  '/:articleId/report/cases',
  auth,
  validateRequestObject,
  validateViolation,
  validArticleId,
  isUser,
  reportArticle
);
articleRoutes.get('/search', searchController);

export default articleRoutes;
