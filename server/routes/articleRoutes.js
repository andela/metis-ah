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
import highlightController from '../controllers/hightlightController';
import highlightValidation from '../helpers/highlightHelpers';

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
  authorId,
  articleId,
  comment
} = highlightValidation;

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
articleRoutes.get('/', auth, paginationParamsValidations, getArticles);
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
  '/:articleId/report/cases',
  auth,
  validateRequestObject,
  validateViolation,
  validArticleId,
  reportArticle
);
articleRoutes.get('/search', searchController);

// HIGHLIGHT ROUTES
// create highlights
articleRoutes.post('/highlights/:articleId/:authorId', auth, articleId, authorId, comment, highlightController.create);

// fetch all reader's highlight
articleRoutes.get('/highlights/:articleId/:authorId', auth, articleId, authorId, highlightController.fetchReaderHighlight);

// fetch all highlights for author
articleRoutes.get('/highlights/:articleId/:authorId/all', auth, articleId, authorId, highlightController.fetchReaderHighlight);

// update highlight route
articleRoutes.put('/highlights/:articleId/:authorId', auth, articleId, authorId, comment, highlightController.update);

// delete an highlight
articleRoutes.delete('/highlights/:articleId/:authorId', auth, articleId, authorId, highlightController.delete);

export default articleRoutes;
