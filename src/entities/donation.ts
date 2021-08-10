import { Authorized, Field, ID } from 'type-graphql';
import { roles, donation_status } from '@prisma/client';

export class Donation {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'wishcardId', description: '' })
  public wishcardId: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'userId', description: '' })
  public userId: number;

  @Authorized([roles.ADMIN])
  @Field({ name: 'amount', description: '' })
  public amount: number;

  @Authorized([roles.ADMIN])
  @Field({ name: 'status', description: '' })
  public status: donation_status;

  @Authorized([roles.ADMIN])
  @Field({ name: 'createdAt', description: '' })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({ name: 'updatedAt', description: '' })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({ name: 'deletedAt', description: '', nullable: true })
  public deletedAt: Date;
}
