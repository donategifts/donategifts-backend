import { user_role, user_loginMode } from '@prisma/client';
import { Authorized, Field, ID, ObjectType } from 'type-graphql';

export type Role = user_role | 'guest';

export enum Roles {
  Donor = 'donor',
  Partner = 'partner',
  Admin = 'admin',
  Guest = 'guest',
}

export type LoginMode = user_loginMode;

export enum UserLoginMode {
  FaceBook = 'facebook',
  Google = 'google',
  default = 'default',
}

@ObjectType({ description: 'User Entity' })
export class User {
  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'id',
    description: 'the users id in the system',
  })
  public id: number;

  @Field({
    name: 'firstName',
    description: 'the users first name',
  })
  public firstName: string;

  @Field({
    name: 'lastName',
    description: 'the users last name',
  })
  public lastName: string;

  @Field({
    name: 'profileImage',
    description: 'the users profile image',
    nullable: true,
  })
  public profileImage: string;

  @Field({
    name: 'email',
    description: 'the users email',
  })
  public email: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'emailVerified',
    description: 'identifier if the users email is verified',
    defaultValue: false,
  })
  public emailVerified: boolean;

  @Authorized([Roles.Admin])
  @Field({
    name: 'emailVerificationHash',
    description: 'verification hash for the email after sign-up',
    nullable: true,
  })
  public emailVerificationHash: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'role',
    description: 'the users role in the system',
  })
  public role: Role;

  @Authorized([Roles.Admin])
  @Field({
    name: 'loginMode',
    description: 'login mode of the user',
  })
  public loginMode: LoginMode;

  @Authorized([Roles.Admin])
  @Field({
    name: 'password',
    description: 'the users password',
  })
  public password: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'passwordResetToken',
    description: 'a password reset token',
    nullable: true,
  })
  public passwordResetToken: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'passwordResetTokenExpires',
    description: 'expiration date of the reset token',
    nullable: true,
  })
  public passwordResetTokenExpires: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'createdAt',
    description: 'timestamp of the users creation date',
  })
  public createdAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'updatedAt',
    description: 'timestamp of a possible user update',
  })
  public updatedAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'deletedAt',
    description: 'timestamp and identifier if the user was deleted',
  })
  public deletedAt: Date;
}
