import express from 'express';
import authorController, { getArticlesByAuthorsId } from '../controllers/authorController';
import auth from '../middleware/auth';

const authorRoutes = express.Router();

// Get authors of the week
authorRoutes.get('/authors-of-the-week', authorController);

// getall authors article
authorRoutes.get('/articles/:authorId', auth, getArticlesByAuthorsId);

export default authorRoutes;
