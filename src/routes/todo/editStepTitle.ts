import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateRequest } from '../../middleware/requestValidation';
import { validateProjectTodo } from '../../middleware/projectValidateTodo';
import { Step } from '../../models/Steps';
import { BadRequestError } from '../../errors/bad_request';
import { Types } from 'mongoose';
interface ReqTodoBody {
  todoId: string;
  projectId?: string;
  newStepTitle: string;
  stepId: string;
}

const router = express.Router();

router.patch(
  '/api/edit/step/title',
  authChecking,
  [
    body('newStepTitle')
      .trim()
      .notEmpty()
      .withMessage('newStepTitle can not be empty'),
  ],
  validateRequest,
  validateProjectTodo,
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
      { $set: { 'steps.$.taskTitle': req.body.newStepTitle.trim() } },
      { new: true },
    );
    if (todo) {
      res.status(200).send(todo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as editStepTitleRoute };
