import { Authorized, Field, ID } from 'type-graphql';
import { wish_card_status } from '.prisma/client';
import { Roles } from './user';

export enum WishCardStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DONATED = 'donated',
}

export class WishCard {
  @Authorized([Roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'WishCard id in the system' })
  public id: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'image',
    description: '',
  })
  public image: string;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'itemPrice',
    description: '',
  })
  public itemPrice: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'itemUrl',
    description: '',
  })
  public itemUrl: string;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'childId',
    description: '',
  })
  public childId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'agencyId',
    description: '',
  })
  public agencyId: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'createdBy',
    description: '',
  })
  public createdBy: number;

  @Authorized([Roles.ADMIN])
  @Field(() => ID, {
    name: 'isLockedBy',
    description: '',
    nullable: true,
  })
  public isLockedBy: number;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'isLockedUntil',
    description: '',
    nullable: true,
  })
  public isLockedUntil: Date;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'status',
    description: '',
  })
  public status: wish_card_status;

  @Authorized([Roles.ADMIN])
  @Field({
    name: 'occasion',
    description: '',
    nullable: true,
  })
  public occasion: string;

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
