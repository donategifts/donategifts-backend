import { Args, Ctx, Resolver } from 'type-graphql';
import { roles } from '@prisma/client';
import { CustomError } from '../helper/customError';
import { Context } from '../types/Context';
import { handlePrismaError } from '../helper/prismaErrorHandler';
import { SignUp } from '../argTypes/SignUp';
import { User } from '../entities/user';

@Resolver()
export class AuthResolver {
  public async signUp(
    @Ctx() context: Context,
    @Args() signUpArgs: SignUp,
  ): Promise<{ user: User }> {
    const { emailToLower, role, firstName, lastName, uid } = signUpArgs;
    if (context.userRole !== roles.GUEST) {
      throw new CustomError({
        message: 'User already logged in',
        code: 'USER_ALREADY_LOGGED_IN',
        status: 403,
      });
    }

    try {
      const createdUser = await context.prisma.user.create({
        data: {
          firstName,
          lastName,
          email: emailToLower,
          role,
          uid,
        },
      });

      return { user: createdUser };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
