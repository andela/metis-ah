import express from 'express';
import auth from '../middleware/auth';
import { rateArticle, create } from '../controllers/articleController';
import { validateArticle } from '../middleware/inputValidator';
import userRoutes from './userRoutes';

const articleRoutes = express.Router();

// POST ARTICLE ROUTE
userRoutes.post('/:articleID/rate', auth, rateArticle);
articleRoutes.post('/', auth, validateArticle, create);

export default articleRoutes;
