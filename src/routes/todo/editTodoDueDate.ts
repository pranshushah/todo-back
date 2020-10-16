import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateRequest } from '../../middleware/requestValidation';
import { Types } from 'mongoose';
import { validateProjectTodo } from '../../middleware/projectValidateTodo';
import { stepsDocInterface } from '../../models/Steps';
import { BadRequestError } from '../../errors/bad_request';
interface ReqTodoBody {
  todoId: string;
  projectId?: string;
  dueDate: string;
}

interface todoResBody {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask?: boolean;
  projectId?: string;
  done: boolean;
  dueDate?: Date;
  important?: boolean;
  myDay?: boolean;
  steps?: stepsDocInterface[];
}

const router = express.Router();

router.patch(
  '/api/todo/edit/important',
  authChecking,
  [body('dueDate').notEmpty().withMessage('you should proivide date')],
  validateRequest,
  validateProjectTodo,
  async (
    req: Request<any, todoResBody, ReqTodoBody>,
    res: Response<todoResBody>,
    next: NextFunction,
  ) => {
    const userId = Types.ObjectId(req.user?.id);
    const date = new Date(req.body.dueDate);
    const newTodo = await Todo.findOneAndUpdate(
      { _id: req.body.todoId, userId },
      { dueDate: date },
      { new: true },
    );
    if (newTodo) {
      res.status(200).send(newTodo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as editTodoDueDateRoute };
