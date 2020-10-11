import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not_auth';

export function authChecking(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new NotAuthorizedError();
  }
  next();
}
