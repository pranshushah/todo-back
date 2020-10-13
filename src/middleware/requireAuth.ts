import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/bad_request';

export function authChecking(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new BadRequestError('you are not authorized', 401);
  }
  next();
}
