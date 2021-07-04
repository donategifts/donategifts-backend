import { CustomError } from './CustomError';
import {
  CustomErrorCode,
  CustomErrorMessage,
  ICustomError,
} from '../../types/ICustomError';

export class TransporterCreateError extends CustomError {
  public constructor(error?: ICustomError) {
    super({
      ...error,
      code: CustomErrorCode.TransporterCreateError,
      message: CustomErrorMessage.TransporterCreateError,
      status: 400,
    });
  }
}
