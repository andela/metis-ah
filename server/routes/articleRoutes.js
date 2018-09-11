import express from 'express';
import articleController from '../controllers/articleController';
import auth from '../middleware/auth';
import inputValidator from '../middleware/inputValidator';

const route = express.Router();

// POST ARTICLE ROUTE
route.post('/', auth, inputValidator.validateArticle, articleController.create);

export default route;
