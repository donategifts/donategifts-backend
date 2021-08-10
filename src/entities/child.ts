import { Authorized, Field, ID } from 'type-graphql';
import { roles } from '@prisma/client';

export class Child {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Child id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'birthday',
  })
  public birthday: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'firstName',
  })
  public firstName: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'lastName',
    nullable: true,
  })
  public lastName: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'interest',
  })
  public interest: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'bio',
    nullable: true,
  })
  public bio: string;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'addressId',
  })
  public addressId: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'createdAt',
  })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'updatedAt',
  })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'deletedAt',
    nullable: true,
  })
  public deletedAt: Date;
}
