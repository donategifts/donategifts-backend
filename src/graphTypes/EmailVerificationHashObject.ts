import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class EmailVerificationHashObject {
  @Field({
    name: 'hash',
    description: 'Email verification hash',
  })
  public hash: string;
}
