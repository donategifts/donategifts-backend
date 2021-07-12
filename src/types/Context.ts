import { PrismaClient } from '@prisma/client';
import type { Role } from '../entities/user';

export interface Context {
  req: Express.Request;
  userRole: Role;
  prisma: PrismaClient;
}
