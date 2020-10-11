import { CustomError } from './custom_error';

export class NoRouteError extends CustomError {
  statusCode = 404;
  constructor() {
    super();
  }
  serializeError() {
    return [{ message: 'Route does not exist' }];
  }
}
