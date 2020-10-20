import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateRequest } from '../../middleware/requestValidation';
import { Step } from '../../models/Steps';
import { BadRequestError } from '../../errors/bad_request';
interface ReqTodoBody {
  todoId: string;
  stepTitle: string;
}

const router = express.Router();

router.post(
  '/api/step/new',
  authChecking,
  [
    body('stepTitle')
      .trim()
      .notEmpty()
      .withMessage('stepTitle can not be empty'),
  ],
  validateRequest,
  async (
    req: Request<any, any, ReqTodoBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const newStep = Step.build({
      taskTitle: req.body.stepTitle.trim(),
      done: false,
    });
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todoId,
        userId: req.user?.id,
      },
      {
        $push: { steps: newStep },
      },
      { new: true },
    );
    if (todo) {
      res.status(200).send(todo);
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as addStepRoute };
