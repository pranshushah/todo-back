import passport from 'passport';
import express, { Request, Response } from 'express';

const router = express.Router();

// getting code for data
router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req: Request, res: Response) => {
    if (process.env.NODE_ENV === 'test') {
      res.status(200).send(req.user); // for jest testing will not called in dev or prdo env
    }
  },
);

// passing code to google and then it will call callback function passed in new GoogleStrategy
router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000',
    successRedirect: 'http://localhost:3000/',
  }),
);

export { router as googleLogin };
