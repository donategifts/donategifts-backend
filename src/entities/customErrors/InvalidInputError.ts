import { CustomError } from './CustomError';
import { CustomErrorCode, ICustomError } from '../../types/ICustomError';

export class InvalidInputError extends CustomError {
  public constructor(message?: string) {
    const invalidInputError: ICustomError = {
      code: CustomErrorCode.InvalidInputError,
      message,
    };
    super(invalidInputError);
  }
}
