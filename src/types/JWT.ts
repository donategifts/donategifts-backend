import { Role } from '../entities/user';

export interface TokenPayLoad {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  isRefreshToken?: boolean;
}
