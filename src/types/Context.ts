import { PrismaClient, roles } from '@prisma/client';

export interface IContext {
  req: Express.Request;
  userRole: roles;
  prisma: PrismaClient;
}
