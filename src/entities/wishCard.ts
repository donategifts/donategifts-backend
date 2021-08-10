import { Authorized, Field, ID } from 'type-graphql';
import { wishcard_status, roles } from '.prisma/client';

export const Wishcard_Status = wishcard_status;

export class WishCard {
  @Authorized([roles.ADMIN])
  @Field(() => ID, { name: 'id', description: 'WishCard id in the system' })
  public id: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'image',
    description: '',
  })
  public image: string;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'itemPrice',
    description: '',
  })
  public itemPrice: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'itemUrl',
    description: '',
  })
  public itemUrl: string;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'childId',
    description: '',
  })
  public childId: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'agencyId',
    description: '',
  })
  public agencyId: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'createdBy',
    description: '',
  })
  public createdBy: number;

  @Authorized([roles.ADMIN])
  @Field(() => ID, {
    name: 'isLockedBy',
    description: '',
    nullable: true,
  })
  public isLockedBy: number;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'isLockedUntil',
    description: '',
    nullable: true,
  })
  public isLockedUntil: Date;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'status',
    description: '',
  })
  public status: wishcard_status;

  @Authorized([roles.ADMIN])
  @Field({
    name: 'occasion',
    description: '',
    nullable: true,
  })
  public occasion: string;

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
