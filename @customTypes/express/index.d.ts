import { userDocInterface } from '../../src/models/User';
declare global {
  namespace Express {
    interface User extends userDocInterface {}
  }
}
