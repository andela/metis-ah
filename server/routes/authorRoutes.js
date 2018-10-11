import express from 'express';
import authorController from '../controllers/authorController';

const authorRoutes = express.Router();

// Get authors of the week
authorRoutes.get('/authors-of-the-week', authorController);

export default authorRoutes;
