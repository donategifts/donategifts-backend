import { Request, Response, NextFunction } from 'express';
import { AuthChecker } from 'type-graphql';
import * as admin from 'firebase-admin';
import { auth } from 'firebase-admin/lib/auth';
import { Context } from '../types/Context';
import { Role } from '../entities/user';
import prisma from '../db/prisma';

admin.initializeApp();

async function getAndSetUserRole(token: auth.DecodedIdToken) {
  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
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
    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.headers.authorization);

    req.user = {
      email: decodedToken.email,
      role: decodedToken.role || (await getAndSetUserRole(decodedToken)),
    };
  } catch (error) {
    console.log(error);
  }

  return next();

  /*
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

   */
};

export const customAuthChecker: AuthChecker<Context, Role> = (
  { context },
  roles,
) => roles.includes(context.userRole);
