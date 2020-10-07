import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/current_user', (req: Request, res: Response) => {
  res.status(200).send(req.user);
});

router.get('/api/logout', (req: Request, res: Response) => {
  req.logOut();
  req.session = null; // from docs of cookie-session this will destroy the session
  res.status(200).send({});
});

export { router as currentUser_logout };
