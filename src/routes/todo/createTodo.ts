import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { authChecking } from '../../middleware/requireAuth';
import { Todo } from '../../models/Todo';
import { validateRequest } from '../../middleware/requestValidation';
import { Types } from 'mongoose';
import { validateProjectTodo } from '../../middleware/projectValidateTodo';
interface ReqTodoBody {
  todoTitle: string;
  projectId?: string;
}

interface todoResBody {
  id: string;
  userId: string;
  todoTitle: string;
  normalTask: string;
  done: boolean;
}

const router = express.Router();

router.post(
  '/api/todo/new',
  authChecking,
  [
    body('todoTitle')
      .trim()
      .notEmpty()
      .withMessage('todoTitle can not be empty'),
  ],
  validateRequest,
  validateProjectTodo,
  async (
    req: Request<any, todoResBody, ReqTodoBody>,
    res: Response<todoResBody>,
  ) => {
    // adding todo in related project
    if (req.body.projectId) {
      const userId = Types.ObjectId(req.user?.id);
      const projectId = Types.ObjectId(req.body.projectId);
      const todo = Todo.build({
        todoTitle: req.body.todoTitle.trim(),
        done: false,
        userId,
        projectId,
      });
      await todo.save();
      res.status(200).send(todo.toJSON());
      //adding todo Task
    } else {
      const userId = Types.ObjectId(req.user?.id);
      const todo = Todo.build({
        todoTitle: req.body.todoTitle.trim(),
        done: false,
        userId,
        normalTask: true,
      });
      await todo.save();
      res.status(200).send(todo.toJSON());
    }
  },
);

export { router as createTodoRoute };
