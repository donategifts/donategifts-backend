import { Arg, Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { hash, compare } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';
import { Roles } from '../entities/user';
import { CustomError } from '../helper/customError';
import { Context } from '../types/Context';
import { generateCustomToken } from '../helper/jwt';
import { handlePrismaError } from '../helper/prismaErrorHandler';
import { JWTObjectType } from '../graphTypes/JWTObject';
import { SignUp } from '../argTypes/SignUp';
import { EmailVerificationHashObject } from '../graphTypes/EmailVerificationHashObject';
import { createEmailVerificationHash } from '../helper/email';
import { ResetPasswordTokenObject } from '../graphTypes/ResetPasswordTokenObject';
import { ConfirmResetPasswordObject } from '../graphTypes/ConfirmResetPasswordObject';

@Resolver()
export class AuthResolver {
  @Mutation(() => EmailVerificationHashObject)
  public async signUp(
    @Ctx() context: Context,
    @Args() { emailToLower, password, role, firstName, lastName, loginMode }: SignUp,
  ): Promise<{ hash: string }> {
    if (context.userRole !== Roles.GUEST) {
      throw new CustomError({
        message: 'User already logged in',
        code: 'USER_ALREADY_LOGGED_IN',
        status: 403,
      });
    }

    try {
      const hashPassword = await hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));

      const emailVerificationHash = createEmailVerificationHash();
      await context.prisma.user.create({
        data: {
          firstName,
          lastName,
          email: emailToLower,
          role,
          loginMode,
          password: hashPassword,
          emailVerified: false,
          emailVerificationHash,
        },
      });

      return {
        hash: emailVerificationHash,
      };
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

      if (!user || !(await compare(password, user.password))) {
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

  @Mutation(() => JWTObjectType)
  public async verifyEmail(
    @Ctx() context: Context,
    @Arg('verificationHash') verificationHash: string,
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
        where: { emailVerificationHash: verificationHash },
      });

      if (!user) {
        throw new CustomError({
          message: 'Incorrect hash',
          code: 'INCORRECT_HASH',
          status: 403,
        });
      }

      await context.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          emailVerified: true,
          emailVerificationHash: null,
        },
      });

      return {
        token: generateCustomToken({ email: user.email, role: user.role }, 'verifyEmail'),
      };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  @Mutation(() => ResetPasswordTokenObject)
  public async requestResetPassword(
    @Ctx() context: Context,
    @Arg('email') email: string,
  ): Promise<{ token: string }> {
    if (context.userRole !== Roles.GUEST) {
      throw new CustomError({
        message: 'User already logged in',
        code: 'USER_ALREADY_LOGGED_IN',
        status: 403,
      });
    }

    const resetToken = uuid();

    try {
      await context.prisma.user.update({
        where: { email },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpires: add(new Date(), {
            minutes: parseInt(process.env.RESET_PASSWORD_EXPIRATION_MINUTES, 10),
          }),
        },
      });

      return {
        token: resetToken,
      };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  @Mutation(() => ConfirmResetPasswordObject)
  public async confirmResetPassword(
    @Ctx() context: Context,
    @Arg('token') token: string,
    @Arg('password') password: string,
  ): Promise<{ success: boolean }> {
    try {
      const user = await context.prisma.user.findUnique({
        where: { passwordResetToken: token },
      });

      if (!user) {
        throw new CustomError({
          message: 'Incorrect token',
          code: 'INCORRECT_TOKEN',
          status: 403,
        });
      }

      await context.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          passwordResetToken: null,
          passwordResetTokenExpires: null,
          password: await hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)),
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
