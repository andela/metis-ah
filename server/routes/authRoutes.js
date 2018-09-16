import express from 'express';
import passport from 'passport';
import authController from '../controllers/authController';

const router = express.Router();

// The google authentication route
router.get('/google', passport.authenticate('google', {
  session: true,
  scope: ['profile', 'email']
}));

// The facebook authentication route
router.get('/facebook', passport.authenticate('facebook', {
  session: true,
  scope: ['public_profile', 'email']
}));

// The twitter authentication route
router.get('/twitter', passport.authenticate('twitter', {
  session: true
}));

// The google authentication failure route
router.get('/google/failure', authController.returnError);

// the facebook authentication failure route
router.get('/facebook/failure', authController.returnError);

// the twitter authentication failure route
router.get('/twitter/failure', authController.returnError);

// The redirect route from google signup
router.get(
  '/google/redirect',
  passport.authenticate(
    'google',
    { failureRedirect: '/google/failure' }
  ),
  authController.returnUser
);

// The redirect route from facebook signup
router.get(
  '/facebook/redirect',
  passport.authenticate(
    'facebook',
    { failureRedirect: '/facebook/failure' }
  ),
  authController.returnUser
);

// The redirect route from twitter signup
router.get(
  '/twitter/redirect',
  passport.authenticate(
    'twitter',
    { failureRedirect: '/twitter/failure' }
  ),
  authController.returnUser
);

export default router;
