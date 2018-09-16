import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FaceBookStrategy from 'passport-facebook';
import TwitterStrategy from 'passport-twitter';
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

passport.use(new GoogleStrategy({
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URI,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, helpers.googlesCallback));

passport.use(new FaceBookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CLIENT_CALLBACK_URI,
  profileFields: ['email']
}, helpers.facebookCallback));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CLIENT_ID,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: process.env.TWITTER_CLIENT_CALLBACK_URI,
}, helpers.twitterCallback));

export default passport;
