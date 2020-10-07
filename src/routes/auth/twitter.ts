import passport from 'passport';
import express from 'express';

const router = express.Router();

// getting code for data
router.get('/api/auth/twitter', passport.authenticate('twitter'));

// passing code to google and then it will call callback function passed in new twitterStrategy
router.get(
  '/api/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/fail',
    successRedirect: '/done',
  }),
);

export { router as twitterLogin };
