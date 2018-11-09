import express from 'express';
import auth from '../middleware/auth';
import notificationController from '../controllers/notificationController';

const {
  getUnreadAll,
  getAll,
  getOne,
  clearOne,
  clearRead,
  markAsRead,
  clearHistory,
  markAllAsRead,
} = notificationController;
const notifyRoutes = express.Router();

notifyRoutes.get('/', auth, getUnreadAll);
notifyRoutes.get('/history', auth, getAll);
notifyRoutes.get('/:notifyId', auth, getOne);
notifyRoutes.put('/:notifyId', auth, markAsRead);
notifyRoutes.put('/', auth, markAllAsRead);
notifyRoutes.delete('/', auth, clearHistory);
notifyRoutes.delete('/read', auth, clearRead);
notifyRoutes.delete('/:notifyId', auth, clearOne);

export default notifyRoutes;
