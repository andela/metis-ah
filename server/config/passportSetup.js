import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FaceBookStrategy from 'passport-facebook';
import dotenv from 'dotenv';

import helpers from '../helpers/helpers';
import model from '../models/index';

const { Users } = model;

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    callbackURL: 'http://localhost:8000/api/users/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, helpers.googlesCallback)
);

passport.use(
  new FaceBookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/users/auth/facebook/redirect',
    profileFields: ['email']
  }, helpers.facebookCallback)
);

export default passport;
