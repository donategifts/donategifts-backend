import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../types/Context';
import { Roles, User } from '../entities/user';
import { CustomError } from '../helper/customError';
import { handlePrismaError } from '../helper/prismaErrorHandler';

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  public async user(
    @Ctx() context: Context,
    @Arg('id', { nullable: true }) id?: number,
    @Arg('email', { nullable: true }) email?: string,
  ): Promise<User> {
    try {
      const query: {
        id?: number;
        email?: string;
      } = {};

      if (id) {
        query.id = id;
        if (email) {
          delete query.id;
          query.email = email;
        }
      }

      const user = await context.prisma.user.findUnique({
        where: {
          ...query,
        },
      });

      if (!user) {
        throw new CustomError({
          message: 'User not found',
          code: 'UserNotFoundError',
        });
      }

      return user as User;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  @Query(() => [User])
  @Authorized([Roles.Admin])
  public async allUsers(
    @Ctx() context: Context,
    @Arg('firstName', { nullable: true }) firstName: string,
    @Arg('lastName', { nullable: true }) lastName: string,
    @Arg('limit', { nullable: true }) limit: number = 25,
    @Arg('offset', { nullable: true }) offset: number = 0,
  ): Promise<User[]> {
    try {
      let allUsers: User[] = [];
      if (firstName && lastName) {
        allUsers = await context.prisma.user.findMany({
          where: {
            firstName,
            lastName,
          },
          take: limit,
          skip: offset,
        });

        if (!allUsers.length) {
          throw new CustomError({
            message: 'No users where found',
            code: 'UserNotFoundError',
          });
        }

        return allUsers;
      }

      if (firstName) {
        allUsers = await context.prisma.user.findMany({
          where: {
            firstName,
          },
          take: limit,
          skip: offset,
        });

        if (!allUsers.length) {
          throw new CustomError({
            message: 'No users where found',
            code: 'UserNotFoundError',
          });
        }

        return allUsers;
      }

      if (lastName) {
        allUsers = await context.prisma.user.findMany({
          where: {
            lastName,
          },
          take: limit,
          skip: offset,
        });

        if (!allUsers.length) {
          throw new CustomError({
            message: 'No users where found',
            code: 'UserNotFoundError',
          });
        }
        return allUsers;
      }

      allUsers = await context.prisma.user.findMany({
        take: limit,
        skip: offset,
      });

      if (!allUsers.length) {
        throw new CustomError({
          message: 'No users where found',
          code: 'UserNotFoundError',
        });
      }
      return allUsers;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
