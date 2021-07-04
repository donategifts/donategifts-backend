import { logger } from '../../helper/logger';
import {
  CustomErrorCode,
  CustomErrorMessage,
  ICustomError,
} from '../../types/ICustomError';

export class CustomError extends Error {
  public code?: CustomErrorCode | string;

  public message: CustomErrorMessage | string;

  public status?: number;

  public meta?: Record<string, any>;

  public error?: Error;

  public constructor(customError: ICustomError) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.message = customError.message;
    this.name = this.constructor.name;
    this.code = customError.code;
    this.status = customError.status;
    this.meta = customError.meta;

    if (process.env.NODE_ENV === 'development') {
      logger.error(customError.error);
    }
  }
}
