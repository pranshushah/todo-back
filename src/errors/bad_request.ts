import { CustomError } from './custom_error';
export class BadRequestError extends CustomError {
  constructor(public message: string, public statusCode: number) {
    super();
  }
  serializeError() {
    return [{ message: this.message }];
  }
}
