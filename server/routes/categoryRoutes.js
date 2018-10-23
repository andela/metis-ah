import express from 'express';
import categoryController from '../controllers/categoryController';
import { multerUploads } from '../config/multer/multerConfig';
import paginationParamsValidations from '../middleware/paginationParamsValidations';
import auth from '../middleware/auth';
import roleValidator from '../middleware/roleValidator';
import authCheckForCategory from '../middleware/authCheckForCategory';
import userController from '../controllers/userController';

const {
  isAdmin
} = roleValidator;

const route = express.Router();

const {
  allCategory,
  singleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = categoryController;
const { usersInterests } = userController;

// GET CATEGORY ROUTE
route.get(
  '/',
  authCheckForCategory,
  usersInterests,
  paginationParamsValidations,
  allCategory
);
route.post('/', auth, isAdmin, multerUploads, createCategory);
route.get('/:categoryId', paginationParamsValidations, singleCategory);
route.put('/:categoryId', auth, isAdmin, multerUploads, updateCategory);
route.delete('/:categoryId', auth, isAdmin, deleteCategory);

export default route;
