import { CustomError } from './custom_error';
export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super();
  }
  serializeError() {
    return [{ message: this.message }];
  }
}
