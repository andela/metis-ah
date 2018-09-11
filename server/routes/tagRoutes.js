import express from 'express';
import tagController from '../controllers/tagController';
import auth from '../middleware/auth';

const route = express.Router();

// GET TAG ROUTE
route.get('/', auth, tagController.all);
route.get('/:tagName', auth, tagController.single);

export default route;
