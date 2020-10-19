import express, { NextFunction, Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Project } from '../../models/Project';
const router = express.Router();

router.get(
  '/api/project/getall',
  authChecking,
  async (req: Request, res: Response, next: NextFunction) => {
    // getting all project by userId.
    const project = await Project.find({
      userId: req.user?.id,
    });

    res.status(200).send(project);
  },
);

export { router as getAllProjectRoute };
