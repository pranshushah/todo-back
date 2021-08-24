import express, { NextFunction, Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { BadRequestError } from '../../errors/bad_request';
interface ReqTodoBody {
  todoId: string;
}

const router = express.Router();

router.patch(
  '/api/edit/todo/delete',
  authChecking,
  async (
    req: Request<any, any, ReqTodoBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const todo = await Todo.findByIdAndDelete(req.body.todoId);
    if (todo) {
      res.status(200).send(todo.toJSON());
    } else {
      next(new BadRequestError('todo does not exist', 400));
    }
  },
);

export { router as removeTodo };
