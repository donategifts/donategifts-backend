import { CustomError } from './CustomError';
import { CustomErrorCode, ICustomError } from '../../types/ICustomError';

export class InvalidInputError extends CustomError {
  public constructor(error?: ICustomError) {
    super({ ...error, code: CustomErrorCode.InvalidInputError });
  }
}
