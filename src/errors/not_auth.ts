import { CustomError } from './custom_error';
export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  serializeError() {
    return [{ message: 'you are not authorized' }];
  }
}
