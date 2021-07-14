import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class JWTObjectType {
  @Field({
    name: 'token',
    description: 'JWT token',
  })
  public token: string;
}
