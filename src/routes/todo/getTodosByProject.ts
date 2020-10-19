import express, { NextFunction, Request, Response } from 'express';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateProjectTodo } from '../../middleware/projectValidateTodo';
interface ReqTodoBody {
  projectId: string;
}

const router = express.Router();

router.get(
  '/api/todo/gettodosbyproject',
  authChecking,
  validateProjectTodo,
  async (req: Request<any, any, ReqTodoBody>, res: Response) => {
    const todos = await Todo.find({
      projectId: req.body.projectId,
      userId: req.user?.id,
    });
    res.status(200).send(todos);
  },
);

export { router as getTodosByProjectsRoute };
