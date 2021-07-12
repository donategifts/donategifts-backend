import { Request, Response, NextFunction } from 'express';
import { AuthChecker } from 'type-graphql';
import { Context } from '../types/Context';
import { Role, Roles } from '../entities/user';
import { extractTokenFromAuthorization } from './jwt';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.user = {};

  if (req.headers && req.headers.authorization) {
    const decoded = extractTokenFromAuthorization(req.headers.authorization);

    if (decoded && !decoded.isRefreshToken) {
      const { email, role } = decoded;

      req.user = {
        email,
        role,
      };
    }
  } else {
    req.user = {
      role: Number(process.env.SKIP_AUTH) ? Roles.ADMIN : Roles.GUEST,
    };
  }

  return next();
};

export const customAuthChecker: AuthChecker<Context, Role> = (
  { context },
  roles,
) => roles.includes(context.userRole);
