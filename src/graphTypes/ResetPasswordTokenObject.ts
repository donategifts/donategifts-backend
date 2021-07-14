import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ResetPasswordTokenObject {
  @Field({
    name: 'token',
    description: 'Reset password token',
  })
  public token: string;
}
