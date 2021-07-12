import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Address {
  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'id', description: 'Address id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'address1',
    description: '',
  })
  public address1: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'address2',
    description: '',
    nullable: true,
  })
  public address2: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'city',
    description: '',
  })
  public city: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'country',
    description: '',
  })
  public country: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'state',
    description: '',
  })
  public state: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'createdAt',
    description: '',
  })
  public createdAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'updatedAt',
    description: '',
  })
  public updatedAt: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'deletedAt',
    description: '',
    nullable: true,
  })
  public deletedAt: Date;
}
