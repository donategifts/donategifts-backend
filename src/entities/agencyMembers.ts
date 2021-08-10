import { Authorized, Field, ID, ObjectType } from 'type-graphql';
import { roles } from '@prisma/client';

export enum AgencyRole {
  ADMIN = 'admin',
  MEMBER = 'Member',
}

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
  @Field(() => AgencyRole, {
    name: 'agencyRole',
    description: 'The role of a agency member',
  })
  public role: AgencyRole;
}
