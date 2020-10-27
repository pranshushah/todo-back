import express, { Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { Types } from 'mongoose';

const router = express.Router();

router.get(
  '/api/todo/getallimptask',
  authChecking,
  async (req: Request, res: Response) => {
    const userId = Types.ObjectId(req.user?.id);
    const todos = await Todo.find({ userId, important: true });
    res.status(200).send(todos);
  },
);

export { router as getAllImpRoute };
