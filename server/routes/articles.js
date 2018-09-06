import express from 'express';
import ArticleController from '../controllers/articles';

const route = express.Router();

// POST ARTICLE ROUTE
route.post('/', ArticleController.create);

export default route;
