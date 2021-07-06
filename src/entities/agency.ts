import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { Roles } from './user';

@ObjectType('Agency', { description: 'Agency Entity' })
export class Agency {
  @Authorized([Roles.Admin])
  @Field((type) => ID, { name: 'id', description: 'Agency id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field({ name: 'Name', description: 'Agency name' })
  public name: string;

  @Authorized([Roles.Admin])
  @Field({ name: 'bio', description: 'Agency biography' })
  public bio: string;

  @Authorized([Roles.Admin])
  @Field({ name: 'isVerified', description: 'Verification state of Agency' })
  public isVerified: boolean;

  @Authorized([Roles.Admin])
  @Field({ name: 'phone', description: 'Agency public phone number' })
  public phone: string;

  @Authorized([Roles.Admin])
  @Field({ name: 'website', description: 'Agency website address' })
  public website: string;

  @Authorized([Roles.Admin])
  @Field((type) => ID, {
    name: 'addressId',
    description: 'Address id from relation',
  })
  public addressId: number;

  @Authorized([Roles.Admin])
  @Field({ name: 'createdAt', description: 'Agency creation date' })
  public createdAt: Date;

  @Authorized([Roles.Admin])
  @Field({ name: 'updatedAt', description: 'Agency update date' })
  public updatedAt: Date;

  @Authorized([Roles.Admin])
  @Field({ name: 'deletedAt', description: 'Agency deletion date' })
  public deletedAt?: Date;
}
