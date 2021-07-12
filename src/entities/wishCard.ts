import { Authorized, Field, ID } from 'type-graphql';
import { wish_card_status } from '.prisma/client';
import { Roles } from './user';

export enum WishCardStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DONATED = 'donated',
}

export class WishCard {
  @Authorized([Roles.Admin])
  @Field(() => ID, { name: 'id', description: 'WishCard id in the system' })
  public id: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'image',
    description: '',
  })
  public image: string;

  @Authorized([Roles.Admin])
  @Field({
    name: 'itemPrice',
    description: '',
  })
  public itemPrice: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'itemUrl',
    description: '',
  })
  public itemUrl: string;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'childId',
    description: '',
  })
  public childId: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'agencyId',
    description: '',
  })
  public agencyId: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'createdBy',
    description: '',
  })
  public createdBy: number;

  @Authorized([Roles.Admin])
  @Field(() => ID, {
    name: 'isLockedBy',
    description: '',
    nullable: true,
  })
  public isLockedBy: number;

  @Authorized([Roles.Admin])
  @Field({
    name: 'isLockedUntil',
    description: '',
    nullable: true,
  })
  public isLockedUntil: Date;

  @Authorized([Roles.Admin])
  @Field({
    name: 'status',
    description: '',
  })
  public status: wish_card_status;

  @Authorized([Roles.Admin])
  @Field({
    name: 'occasion',
    description: '',
    nullable: true,
  })
  public occasion: string;

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
