import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateRequest } from '../../middleware/requestValidation';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';
interface ReqTodoBody {
  todoId: string;
  projectId?: string;
  done: boolean;
  stepId: string;
}

const router = express.Router();

router.patch(
  '/api/edit/step/done',
  authChecking,
  [body('done').isBoolean().withMessage('done can not be empty')],
  validateRequest,
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
      { $set: { 'steps.$.done': req.body.done } },
      { new: true },
    );
    if (todo) {
      res.status(200).send(todo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as editStepDoneRoute };
