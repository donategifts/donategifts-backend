import { CustomError } from './CustomError';
import {
  CustomErrorCode,
  CustomErrorMessage,
  ICustomError,
} from '../../types/ICustomError';

export class UserNotFoundError extends CustomError {
  public constructor() {
    const userNotFoundError: ICustomError = {
      code: CustomErrorCode.UserNotFoundError,
      message: CustomErrorMessage.UserNotFoundError,
    };
    super(userNotFoundError);
  }
}
