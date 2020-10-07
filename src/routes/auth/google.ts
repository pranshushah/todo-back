import passport from 'passport';
import express, { Request, Response } from 'express';

const router = express.Router();

// getting code for data
router.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// passing code to google and then it will call callback function passed in new GoogleStrategy
router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/fail',
    successRedirect: '/done',
  }),
);

router.get('/api/current_user', (req: Request, res: Response) => {
  res.send(req.user);
});

router.get('/api/logout', (req: Request, res: Response) => {
  req.logout();
  res.send('done');
});

export { router as googleLogin };
