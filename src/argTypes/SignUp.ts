import { ArgsType, Field } from 'type-graphql';
import { roles } from '@prisma/client';

@ArgsType()
export class SignUp {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;

  @Field()
  public email: string;

  @Field()
  public role: roles;

  @Field()
  public uid: string;

  public get emailToLower(): string {
    return this.email.toLowerCase();
  }
}
