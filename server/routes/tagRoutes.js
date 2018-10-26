import express from 'express';
import tagController from '../controllers/tagController';

const route = express.Router();

// GET TAG ROUTE
route.get('/', tagController.all);
route.get('/:tagName', tagController.single);

export default route;
