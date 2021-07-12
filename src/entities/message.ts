import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Message {
  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'imuserIdage',
    description: '',
  })
  public userId: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'wishcardId',
    description: '',
  })
  public wishcardId: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'message',
    description: '',
  })
  public message: string;

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
