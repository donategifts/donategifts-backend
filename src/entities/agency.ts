import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { Roles } from './user';

@ObjectType('Agency', { description: 'Agency Entity' })
export class Agency {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Agency id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'Name', description: 'Agency name' })
  public name: string;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'bio', description: 'Agency biography', nullable: true })
  public bio: string;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'isVerified', description: 'Verification state of Agency' })
  public isVerified: boolean;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'phone', description: 'Agency public phone number' })
  public phone: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'website',
    description: 'Agency website address',
    nullable: true,
  })
  public website: string;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'addressId',
    description: 'Address id from relation',
  })
  public addressId: number;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'createdAt', description: 'Agency creation date' })
  public createdAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'updatedAt', description: 'Agency update date' })
  public updatedAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({ name: 'deletedAt', description: 'Agency deletion date' })
  public deletedAt?: Date;
}
