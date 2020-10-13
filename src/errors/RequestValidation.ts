import { ValidationError } from 'express-validator';
import { CustomError } from './custom_error';
export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[], public statusCode: number) {
    super();
  }
  serializeError() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
