import { CustomError } from './custom_error';
export class DatabaseConnectionError extends CustomError {
  reason = 'error connecting to the database';
  statusCode = 500;
  constructor() {
    super();
  }
  serializeError() {
    return [{ message: this.reason }];
  }
}
