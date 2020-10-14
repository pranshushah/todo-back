import { errorResponceObject } from '../utils/types';
export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor() {
    super('error');
    // using new.target.prototype, we don't need to use Object.setPrototypeof()  on sub-class of CustomError
    // see also {@link https://stackoverflow.com/questions/41102060/typescript-extending-error-class#_=_}
    Object.setPrototypeOf(this, new.target.prototype);
  }
  abstract serializeError(): errorResponceObject[];
}
