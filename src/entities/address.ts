import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Address {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Address id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'address1',
    description: '',
  })
  public address1: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'address2',
    description: '',
    nullable: true,
  })
  public address2: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'city',
    description: '',
  })
  public city: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'country',
    description: '',
  })
  public country: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'state',
    description: '',
  })
  public state: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'createdAt',
    description: '',
  })
  public createdAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'updatedAt',
    description: '',
  })
  public updatedAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'deletedAt',
    description: '',
    nullable: true,
  })
  public deletedAt: Date;
}
