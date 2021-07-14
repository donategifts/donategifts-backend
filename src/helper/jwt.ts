import * as jwt from 'jsonwebtoken';
import { TokenPayLoad } from '../types/JWT';
import { CustomError } from './customError';
import { logger } from './logger';

export const { JWT_SECRET, JWT_TOKEN_EXPIRES_IN } = process.env;
export const JWT_ALGORITHM = 'HS256';

export const decodeToken = (token: string, throwOnExpired = true, quiet = false): TokenPayLoad => {
  let decoded = {} as TokenPayLoad;

  try {
    decoded = <TokenPayLoad>jwt.verify(token, String(JWT_SECRET), {
      algorithms: [JWT_ALGORITHM],
    });
  } catch (error) {
    if (throwOnExpired && error instanceof jwt.TokenExpiredError) {
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

export const extractTokenFromAuthorization = (authHeader: string): TokenPayLoad | null => {
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

export const generateCustomToken = (
  tokenPayload: TokenPayLoad,
  subject: string,
  tokenExpiresIn = String(JWT_TOKEN_EXPIRES_IN),
): string => {
  const jwtBaseOptions: jwt.SignOptions = {
    algorithm: JWT_ALGORITHM,
    issuer: 'donategifts',
    subject,
    expiresIn: tokenExpiresIn,
  };

  const token = jwt.sign(tokenPayload, String(JWT_SECRET), jwtBaseOptions);

  return token;
};
