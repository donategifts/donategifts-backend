import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Child {
  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'id', description: 'Child id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'birthday',
  })
  public birthday: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'firstName',
  })
  public firstName: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'lastName',
    nullable: true,
  })
  public lastName: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'interest',
  })
  public interest: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'bio',
    nullable: true,
  })
  public bio: string;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'addressId',
  })
  public addressId: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'createdAt',
  })
  public createdAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'updatedAt',
  })
  public updatedAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'deletedAt',
    nullable: true,
  })
  public deletedAt: Date;
}
