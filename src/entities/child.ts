import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Child {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Child id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'birthday',
  })
  public birthday: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'firstName',
  })
  public firstName: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'lastName',
    nullable: true,
  })
  public lastName: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'interest',
  })
  public interest: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'bio',
    nullable: true,
  })
  public bio: string;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'addressId',
  })
  public addressId: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'createdAt',
  })
  public createdAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'updatedAt',
  })
  public updatedAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'deletedAt',
    nullable: true,
  })
  public deletedAt: Date;
}
