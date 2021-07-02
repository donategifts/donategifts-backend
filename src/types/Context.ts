import { PrismaClient } from '@prisma/client';
import { Roles } from '../entities/user';

export interface Context {
  req: Express.Request;
  userRole: Roles;
  prisma: PrismaClient;
}
