import { Arg, Args, Ctx, Mutation, Resolver } from 'type-graphql';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { add } from 'date-fns';
import { Roles } from '../entities/user';
import { CustomError } from '../helper/customError';
import { Context } from '../types/Context';
import { handlePrismaError } from '../helper/prismaErrorHandler';
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
    @Args() signUpArgs: SignUp,
  ): Promise<{ hash: string }> {
    const { emailToLower, password, role, firstName, lastName, loginMode } =
      signUpArgs;
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
            minutes: parseInt(
              process.env.RESET_PASSWORD_EXPIRATION_MINUTES,
              10,
            ),
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
          password: await hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
          ),
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
