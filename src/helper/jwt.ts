import {
  Algorithm,
  SignOptions,
  verify,
  sign,
  TokenExpiredError,
} from 'jsonwebtoken';
import { Role } from '../entities/user';
import { TokenPayLoad } from '../types/JWT';
import { CustomError } from './customError';
import { logger } from './logger';

export const {
  JWT_SECRET,
  JWT_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_ISSUER,
  JWT_ALGORITHM,
} = process.env;

export const decodeToken = (
  token: string,
  throwOnExpired = true,
  quiet = false,
): TokenPayLoad => {
  let decoded = {} as TokenPayLoad;

  try {
    decoded = <TokenPayLoad>verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM as Algorithm],
    });
  } catch (error) {
    if (throwOnExpired && error instanceof TokenExpiredError) {
      throw new CustomError({
        message: 'Token expired',
        code: 'AuthorizationTokenExpiredError',
        status: 401,
        error,
      });
    }

    if (!quiet) {
      logger.error(`${error.message}: ${token}`);
    }
  }

  return decoded;
};

export const extractTokenFromAuthorization = (
  authHeader: string,
): TokenPayLoad | null => {
  const authHeaderParts = authHeader.split(' ');

  if (authHeaderParts.length !== 2) {
    throw new CustomError({
      message: "Authorization header format is: 'Authorization: JWT [token]'",
      code: 'AuthorizationHeaderFormatError',
    });
  }

  const [scheme, token] = authHeaderParts;

  if (scheme.toUpperCase() !== 'JWT') {
    throw new CustomError({
      message: `Unknown authorization scheme used: ${scheme}`,
      code: 'AuthorizationHeaderSchemeError',
    });
  }

  const decoded = decodeToken(token, true);

  if (decoded && !decoded.isRefreshToken) {
    return decoded;
  }

  if (!decoded) {
    throw new CustomError({
      message: `Invalid token used: ${token}`,
      code: 'AuthorizationTokenError',
      status: 401,
    });
  }

  return null;
};

export const generateToken = (
  user: { firstName: string; lastName: string; email: string },
  role: Role,
  includeRefreshToken?: boolean,
  tokenExpiresIn = JWT_TOKEN_EXPIRES_IN,
): { token: string; refreshToken?: string } => {
  const tokenData = {} as {
    token: string;
    refreshToken?: string;
  };

  const { firstName, lastName, email } = user;

  const jwtBaseOptions: SignOptions = {
    algorithm: JWT_ALGORITHM as Algorithm,
    issuer: JWT_ISSUER,
    subject: user.email,
  };

  const tokenPayload: TokenPayLoad = {
    firstName,
    lastName,
    email,
    role,
  };

  const token = sign(tokenPayload, JWT_SECRET, {
    ...jwtBaseOptions,
    expiresIn: tokenExpiresIn,
  });

  tokenData.token = token;

  if (includeRefreshToken) {
    const refreshTokenPayload = {
      ...tokenPayload,
      isRefreshToken: true,
    };

    const refreshToken = sign(refreshTokenPayload, JWT_SECRET, {
      ...jwtBaseOptions,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    tokenData.refreshToken = refreshToken;
  }

  return tokenData;
};

export const generateCustomToken = (
  tokenPayload: TokenPayLoad,
  subject: string,
  tokenExpiresIn = String(JWT_TOKEN_EXPIRES_IN),
): string => {
  const jwtBaseOptions: SignOptions = {
    algorithm: JWT_ALGORITHM as Algorithm,
    issuer: JWT_ISSUER,
    subject,
    expiresIn: tokenExpiresIn,
  };

  const token = sign(tokenPayload, JWT_SECRET, jwtBaseOptions);

  return token;
};
