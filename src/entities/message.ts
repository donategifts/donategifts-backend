import { Authorized, Field, ID } from 'type-graphql';
import { Roles } from './user';

export class Message {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'imuserIdage',
    description: '',
  })
  public userId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'wishcardId',
    description: '',
  })
  public wishcardId: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'message',
    description: '',
  })
  public message: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'createdAt',
    description: '',
  })
  public createdAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'updatedAt',
    description: '',
  })
  public updatedAt: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'deletedAt',
    description: '',
    nullable: true,
  })
  public deletedAt: Date;
}
