import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/types';
import { CustomError } from '../errors/custom_error';
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<errorResponse>,
  next: NextFunction,
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }
  res.status(400).send({
    errors: [{ message: err.message }],
  });
}
