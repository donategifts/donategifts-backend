import { user_role } from '@prisma/client';
import { ArgsType, Field } from 'type-graphql';
import { LoginMode } from '../entities/user';

@ArgsType()
export class SignUp {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public loginMode: LoginMode;

  @Field()
  public role: user_role;

  public get emailToLower(): string {
    return this.email.toLowerCase();
  }
}
