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
import checkParams from '../middleware/checkParams';
import { multerUploads } from '../config/multer/multerConfig';
import paginationParamsValidations from '../middleware/paginationParamsValidations';

const {
  reportArticle,
  rateArticle,
  create,
  like,
  getArticles,
  getSingleArticle
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

const articleRoutes = express.Router();
articleRoutes.get('/', auth, paginationParamsValidations, getArticles);
articleRoutes.get('/search', searchController);

// POST ARTICLE ROUTE
articleRoutes.post('/:articleId', auth, validArticleId, validateComments, addComment);
articleRoutes.get('/:articleId', auth, checkParams.id, getSingleArticle);

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
  '/:articleId/report/cases',
  auth,
  validateRequestObject,
  validateViolation,
  validArticleId,
  reportArticle
);

export default articleRoutes;
