import { CustomError } from './CustomError';
import {
  CustomErrorCode,
  CustomErrorMessage,
  ICustomError,
} from '../../types/ICustomError';

export class UserNotFoundError extends CustomError {
  public constructor(error?: ICustomError) {
    super({
      ...error,
      code: CustomErrorCode.UserNotFoundError,
      message: CustomErrorMessage.UserNotFoundError,
    });
  }
}
