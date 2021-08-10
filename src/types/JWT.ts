import { roles } from '@prisma/client';

export interface TokenPayLoad {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: roles;
  isRefreshToken?: boolean;
}
