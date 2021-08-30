import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { roles, agency_roles } from '@prisma/client';

@ObjectType('AgencyMembers')
export class AgencyMembers {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'AgencyMember id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'userId',
  })
  public userId: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'agencyId',
  })
  public agencyId: number;

  @Authorized([roles.ADMIN])
  @Field(() => agency_roles, {
    name: 'agencyRole',
    description: 'The role of a agency member',
  })
  public role: agency_roles;
}
