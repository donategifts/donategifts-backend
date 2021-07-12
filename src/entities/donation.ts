import { Authorized, Field, ID } from 'type-graphql';
import { donation_status } from '.prisma/client';
import { Roles } from './user';

export enum DonationStatus {
  CONFIRMED = 'confirmed',
  ORDERED = 'ordered',
  DELIVERED = 'delivered',
}

export class Donation {
  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'wishcardId', description: '' })
  public wishcardId: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'userId', description: '' })
  public userId: number;

  @Authorized([Roles.Admin])
  @Field({ name: 'amount', description: '' })
  public amount: number;

  @Authorized([Roles.Admin])
  @Field({ name: 'status', description: '' })
  public status: donation_status;

  @Authorized([Roles.Admin])
  @Field({ name: 'createdAt', description: '' })
  public createdAt: Date;

  @Authorized([Roles.Admin])
  @Field({ name: 'updatedAt', description: '' })
  public updatedAt: Date;

  @Authorized([Roles.Admin])
  @Field({ name: 'deletedAt', description: '', nullable: true })
  public deletedAt: Date;
}
