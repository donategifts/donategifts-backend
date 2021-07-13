import { Role } from '../entities/user';

export interface TokenPayLoad {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  isRefreshToken?: boolean;
}
