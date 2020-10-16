import express, { NextFunction, Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { Types } from 'mongoose';
import { validateProjectTodo } from '../../middleware/projectValidateTodo';
import { stepsDocInterface } from '../../models/Steps';
import { BadRequestError } from '../../errors/bad_request';
interface ReqTodoBody {
  todoId: string;
  done: boolean;
  projectId?: string;
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
  '/api/todo/edit/done',
  authChecking,
  validateProjectTodo,
  async (
    req: Request<any, todoResBody, ReqTodoBody>,
    res: Response<todoResBody>,
    next: NextFunction,
  ) => {
    const userId = Types.ObjectId(req.user?.id);
    const newTodo = await Todo.findOneAndUpdate(
      { _id: req.body.todoId, userId },
      { done: req.body.done },
      { new: true },
    );
    if (newTodo) {
      res.status(200).send(newTodo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as editStatusTitleRoute };
