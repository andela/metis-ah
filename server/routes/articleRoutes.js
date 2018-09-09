import express from 'express';
import ArticleController from '../controllers/articleController';
import verifyToken from '../middleware/verifyToken';
import InputValidator from '../middleware/inputValidator';

const route = express.Router();

// POST ARTICLE ROUTE
route.post('/', verifyToken, InputValidator.validateArticle, ArticleController.create);

export default route;
