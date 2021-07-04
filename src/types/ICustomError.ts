export enum CustomErrorCode {
  InvalidInputError = 'INVALID_INPUT_ERROR',
  UserNotFoundError = 'USER_NOT_FOUND_ERROR',
  TransporterCreateError = 'TRANSPORT_CREATE_ERROR',
  ServerStartFailedError = 'SERVER_START_FAILED',
}

export enum CustomErrorMessage {
  UserNotFoundError = 'No User(s) found',
  TransporterCreateError = 'Failed to create Transporter',
}

export interface ICustomError {
  code: CustomErrorCode;
  message: CustomErrorMessage | string;
  status?: number;
  meta?: Record<string, any>;
  error?: Error;
}
