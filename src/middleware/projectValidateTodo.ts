import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad_request';
import { Project } from '../models/Project';
import { Types } from 'mongoose';
interface ReqTodoBody {
  projectId?: string;
}

export async function validateProjectTodo(
  req: Request<any, any, ReqTodoBody>,
  res: Response,
  next: NextFunction,
) {
  if (req.body.projectId) {
    const projectId = Types.ObjectId(req.body.projectId);
    const userId = Types.ObjectId(req.user?.id);
    const project = await Project.findOne({ _id: projectId, userId });
    if (project) {
      next();
    } else {
      next(new BadRequestError('project does not exist', 400));
    }
  } else {
    next();
  }
}
