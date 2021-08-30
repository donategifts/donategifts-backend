import { roles } from '@prisma/client';
import { Authorized, Field, ID, ObjectType } from 'type-graphql';

@ObjectType('User', { description: 'User Entity' })
export class User {
  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'id',
    description: 'the users id in the system',
  })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'uid',
    description: 'the users uid in firebase',
  })
  public uid: string;

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
    name: 'email',
    description: 'the users email',
  })
  public email: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'role',
    description: 'the users role in the system',
  })
  public role: roles;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'createdAt',
    description: 'timestamp of the users creation date',
  })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'updatedAt',
    description: 'timestamp of a possible user update',
  })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'deletedAt',
    description: 'timestamp and identifier if the user was deleted',
  })
  public deletedAt: Date;
}
