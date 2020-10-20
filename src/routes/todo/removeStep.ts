import express, { NextFunction, Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';
interface ReqTodoBody {
  todoId: string;
  stepId: string;
}

const router = express.Router();

router.patch(
  '/api/edit/step/delete',
  authChecking,
  async (
    req: Request<any, any, ReqTodoBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todoId,
        userId: req.user?.id,
        'steps._id': Types.ObjectId(req.body.stepId),
      },
      { $pull: { steps: { _id: req.body.stepId } } },
      { new: true },
    );
    if (todo) {
      res.status(200).send(todo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as removeStepRoute };
