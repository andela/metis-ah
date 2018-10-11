import express from 'express';
import articleController from '../controllers/articleController';
import commentController from '../controllers/commentController';
import likeController from '../controllers/likeController';
import commentValidator from '../middleware/commentValidator';
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

const articleRoutes = express.Router();

const {
  reportArticle,
  rateArticle,
  create,
  like,
  getArticles,
  getFeaturedArticles
} = articleController;
const { addComment, updateComment, updateReply } = commentController;
const {
  validateComments, validateLikeObject, authorizeCommentUpdate
} = commentValidator;
const { validateArticle } = inputValidator;

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


// Comment routes
// Add comment
articleRoutes.post(
  '/:articleId/comments',
  auth,
  checkParams.id,
  validArticleId,
  validateComments,
  addComment
);
articleRoutes.post(
  '/:articleId/comments/:commentId/reply',
  auth,
  checkParams.id,
  validArticleId,
  validateComments,
  addComment
);
// Update comment
articleRoutes.put(
  '/:articleId/comments/:commentId',
  auth,
  checkParams.id,
  authorizeCommentUpdate,
  validateComments,
  updateComment
);
// Update comment
articleRoutes.put(
  '/:articleId/comments/:commentId/reply/:replyId',
  auth,
  checkParams.id,
  authorizeCommentUpdate,
  validateComments,
  updateReply
);
// Like comment
articleRoutes.post(
  '/:articleId/comments/like',
  auth,
  validateLikeObject,
  likeController
);

// POST ARTICLE ROUTE
articleRoutes.get('/', auth, paginationParamsValidations, isUser, getArticles);
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
articleRoutes.post('/', auth, multerUploads, validateArticle, create);
articleRoutes.post('/:articleId/like/:likeType', auth, checkParams.id, checkParams.likeType, like);
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
articleRoutes.get('/featured', getFeaturedArticles);

export default articleRoutes;
