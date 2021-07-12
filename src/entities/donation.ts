import { Authorized, Field, ID } from 'type-graphql';
import { donation_status } from '.prisma/client';
import { Roles } from './user';

export enum DonationStatus {
  CONFIRMED = 'confirmed',
  ORDERED = 'ordered',
  DELIVERED = 'delivered',
}

export class Donation {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'wishcardId', description: '' })
  public wishcardId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'userId', description: '' })
  public userId: number;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'amount', description: '' })
  public amount: number;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'status', description: '' })
  public status: donation_status;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'createdAt', description: '' })
  public createdAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'updatedAt', description: '' })
  public updatedAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'deletedAt', description: '', nullable: true })
  public deletedAt: Date;
}
