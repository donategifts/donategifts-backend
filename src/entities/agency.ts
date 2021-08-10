import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { roles } from '@prisma/client';

@ObjectType('Agency', { description: 'Agency Entity' })
export class Agency {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Agency id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field({ name: 'Name', description: 'Agency name' })
  public name: string;

  @Authorized([roles.ADMIN])
  @Field({ name: 'bio', description: 'Agency biography', nullable: true })
  public bio: string;

  @Authorized([roles.ADMIN])
  @Field({ name: 'isVerified', description: 'Verification state of Agency' })
  public isVerified: boolean;

  @Authorized([roles.ADMIN])
  @Field({ name: 'phone', description: 'Agency public phone number' })
  public phone: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'website',
    description: 'Agency website address',
    nullable: true,
  })
  public website: string;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'addressId',
    description: 'Address id from relation',
  })
  public addressId: number;

  @Authorized([roles.ADMIN])
  @Field({ name: 'createdAt', description: 'Agency creation date' })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({ name: 'updatedAt', description: 'Agency update date' })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({ name: 'deletedAt', description: 'Agency deletion date' })
  public deletedAt?: Date;
}
