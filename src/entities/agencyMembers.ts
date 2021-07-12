import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { Roles } from './user';

export enum AgencyRole {
  ADMIN = 'admin',
  MEMBER = 'Member',
}

@ObjectType('AgencyMembers')
export class AgencyMembers {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'AgencyMember id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'userId',
  })
  public userId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'agencyId',
  })
  public agencyId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => AgencyRole, {
    name: 'agencyRole',
    description: 'The role of a agency member',
  })
  public role: AgencyRole;
}
