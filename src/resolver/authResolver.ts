import { Arg, Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { Roles } from '../entities/user';
import { CustomError } from '../helper/customError';
import { Context } from '../types/Context';
import { generateCustomToken } from '../helper/jwt';
import { handlePrismaError } from '../helper/prismaErrorHandler';
import { JWTObjectType } from '../graphTypes/JWTObject';
import { SignUp } from '../argTypes/SignUp';

@Resolver()
export class AuthResolver {
  @Mutation(() => JWTObjectType)
  public async signUp(
    @Ctx() context: Context,
    @Args() { email, password, role, firstName, lastName, loginMode }: SignUp,
  ): Promise<{ token: string }> {
    if (context.userRole !== Roles.GUEST) {
      throw new CustomError({
        message: 'User already logged in',
        code: 'USER_ALREADY_LOGGED_IN',
        status: 403,
      });
    }

    try {
      const hashPassword = await hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
      );

      await context.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          role,
          loginMode,
          password: hashPassword,
        },
      });

      return { token: generateCustomToken({ email, role }, 'login') };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  @Mutation(() => JWTObjectType)
  public async login(
    @Ctx() context: Context,
    @Arg('email') email: string,
    @Arg('password') password: string,
  ): Promise<{ token: string }> {
    if (context.userRole !== Roles.GUEST) {
      throw new CustomError({
        message: 'User already logged in',
        code: 'USER_ALREADY_LOGGED_IN',
        status: 403,
      });
    }

    try {
      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user || !compare(password, user.password)) {
        throw new CustomError({
          message: 'Incorrect password',
          code: 'INCORRECT_PASSWORD',
          status: 403,
        });
      }

      return {
        token: generateCustomToken({ email, role: user.role }, 'login'),
      };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
