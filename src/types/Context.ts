import { PrismaClient, roles } from '@prisma/client';

export interface Context {
  req: Express.Request;
  userRole: roles;
  prisma: PrismaClient;
}
