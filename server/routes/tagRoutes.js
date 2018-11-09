import express from 'express';
import tagController from '../controllers/tagController';

const route = express.Router();
const {
  all,
  single
} = tagController;

// GET TAG ROUTE
route.get('/', all);
route.get('/:tagName', single);

export default route;
