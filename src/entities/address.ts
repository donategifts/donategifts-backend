import { Authorized, Field, ID } from 'type-graphql';
import { roles } from '@prisma/client';

export class Address {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Address id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'address1',
    description: '',
  })
  public address1: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'address2',
    description: '',
    nullable: true,
  })
  public address2: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'city',
    description: '',
  })
  public city: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'country',
    description: '',
  })
  public country: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'state',
    description: '',
  })
  public state: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'createdAt',
    description: '',
  })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'updatedAt',
    description: '',
  })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'deletedAt',
    description: '',
    nullable: true,
  })
  public deletedAt: Date;
}
