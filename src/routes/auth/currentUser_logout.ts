import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/current_user', (req: Request, res: Response) => {
  res.status(200).send(req.user);
});

router.get('/api/logout', (req: Request, res: Response) => {
  req.logout();
  req.session = null;
  res.status(200).send('done');
});

export { router as currentUser_logout };
