import { Authorized, Field, ID } from 'type-graphql';
import { roles } from '@prisma/client';

export class Message {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'Message id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'imuserIdage',
    description: '',
  })
  public userId: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'wishcardId',
    description: '',
  })
  public wishcardId: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'message',
    description: '',
  })
  public message: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'createdAt',
    description: '',
  })
  public createdAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'updatedAt',
    description: '',
  })
  public updatedAt: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'deletedAt',
    description: '',
    nullable: true,
  })
  public deletedAt: Date;
}
