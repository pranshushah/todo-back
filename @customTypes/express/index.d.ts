import { userInfo } from '../../src/utils/types';
declare global {
  namespace Express {
    interface User extends userInfo {}
  }
}
