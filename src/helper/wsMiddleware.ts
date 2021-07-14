import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { TokenPayLoad } from '../types/JWT';
import { extractTokenFromAuthorization, JWT_ALGORITHM, JWT_SECRET } from './jwt';
import { logger } from './logger';

export const forwardAuthEndpoint = async (req: Request, res: Response): Promise<any> => {
  const { carrier } = req.query;

  logger.log(`executing auth-check for carrier: ${carrier}`);

  const path = String(req.headers['x-forwarded-uri']);
  const token = String(path?.split('/').pop());

  try {
    jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });
  } catch (_error) {
    return res.status(403).send();
  }

  return res.status(200).send();
};

export const wsAuthMiddleware = (params: { user: TokenPayLoad; authorization: string }): void => {
  params.user = {} as TokenPayLoad;

  if (params.authorization) {
    const decoded = extractTokenFromAuthorization(params.authorization);
    if (decoded && !decoded.isRefreshToken) {
      const { id, firstName, lastName, role } = decoded;

      params.user = {
        id,
        firstName,
        lastName,
        role,
      };
    }
  }
};
