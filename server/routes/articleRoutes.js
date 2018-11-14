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

import roleValidator from '../middleware/roleValidator';
import checkParams from '../middleware/checkParams';
import { multerUploads } from '../config/multer/multerConfig';
import paginationParamsValidations from '../middleware/paginationParamsValidations';

const articleRoutes = express.Router();

const {
  like,
  getUserReaction,
  getArticles,
  getFeaturedArticles,
  getPopularArticlesForTheWeek,
  createBookmark,
  fetchBookmark,
  shareArticle,
  getSingleArticle,
  create,
  rateArticle,
  reportArticle
} = articleController;

const { addComment, updateComment, updateReply } = commentController;
const {
  validateComments,
  validateLikeObject,
  authorizeCommentUpdate
} = commentValidator;
const { validateArticle } = inputValidator;

const {
  validArticleId,
  validateRating,
  validateObject,
  validateUser
} = ratingValidation;
const { validateViolation, validateRequestObject } = reportValidation;
const { isUser } = roleValidator;


articleRoutes.get('/', auth, paginationParamsValidations, getArticles);
articleRoutes.get('/search', searchController);
articleRoutes.get('/popular', getPopularArticlesForTheWeek);
articleRoutes.get('/featured', getFeaturedArticles);
// FEATURED ARTICLE ENDPOINT

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
// POST ARTICLE ROUTE
articleRoutes.get('/', paginationParamsValidations, getArticles);
articleRoutes.get('/:articleId', checkParams.id, getSingleArticle);
articleRoutes.post('/:articleId', auth, validArticleId, validateComments, addComment);

articleRoutes.post(
  '/:articleId/comments/like',
  auth,
  validateLikeObject,
  likeController
);


// RATE ARTICLE ENDPOINT
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

// CREATE ARTICLE ENDPOINT
articleRoutes.post('/', auth, multerUploads, validateArticle, isUser, create);

// SHARE ARTICLE ENDPOINT
articleRoutes.post('/:articleId/share', auth, checkParams.id, shareArticle);

// LIKE ARTICLE ENDPOINT
articleRoutes.post(
  '/:articleId/like/:likeType',
  auth,
  checkParams.id,
  checkParams.likeType,
  isUser,
  like
);

// check if current user has like or dislike an article
articleRoutes.get(
  '/:articleId/like',
  auth,
  checkParams.id,
  isUser,
  getUserReaction
);

// REPORT ARTICLE ENDPOINT
articleRoutes.post(
  '/:articleId/report/cases',
  auth,
  validateRequestObject,
  validateViolation,
  validArticleId,
  isUser,
  reportArticle
);

// SEARCH ARTICLE ENDPOINT

// CREATE BOOKMARK ROUTE
articleRoutes.post('/bookmarks/add/:articleId', auth, createBookmark);

// GET ALL THE BOOKMARKS OF A USER
articleRoutes.get('/bookmarks/user/all', auth, fetchBookmark);

export default articleRoutes;
