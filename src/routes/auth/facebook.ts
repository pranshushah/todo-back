import passport from 'passport';
import express, { Request, Response } from 'express';

const router = express.Router();

// getting code for data
router.get(
  '/api/auth/facebook',
  passport.authenticate('facebook', { scope: ['profile', 'email'] }),
);

// passing code to google and then it will call callback function passed in new facebookStrategy
router.get('/api/auth/facebook/callback', passport.authenticate('facebook'));

router.get('/api/current_user', (req: Request, res: Response) => {
  console.log(req.user);
  res.send(req.user);
});

router.get('/api/logout', (req: Request, res: Response) => {
  req.logout();
  res.send('done');
});

export { router as facebookLogin };
