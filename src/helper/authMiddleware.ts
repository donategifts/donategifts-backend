import { Request, Response, NextFunction } from 'express';
import { AuthChecker } from 'type-graphql';
import * as admin from 'firebase-admin';
import { roles } from '@prisma/client';
import { Context } from '../types/Context';
import prisma from '../db/prisma';
import { logger } from './logger';
import { CustomError } from './customError';

admin.initializeApp();

async function getAndSetUserRole(token: admin.auth.DecodedIdToken) {
  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    throw new CustomError({
      message: 'No user found with that email',
      code: 'User not found',
      status: 403,
    });
  }

  await admin.auth().setCustomUserClaims(token.uid, { role: user.role });

  return user.role;
}

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  req.user = {};

  try {
    if (!req.headers || !req.headers.authorization) {
      req.user = {
        role: roles.GUEST,
      };
      return next();
    }

    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);

    req.user = {
      email: decodedToken.email,
      role: decodedToken.role || (await getAndSetUserRole(decodedToken)),
      uid: decodedToken.uid,
    };
  } catch (error) {
    logger.error(error);
  }

  return next();
};

export const customAuthChecker: AuthChecker<Context, roles> = (
  { context },
  userRoles,
) => userRoles.includes(context.userRole);
