import { Arg, Ctx, Query } from 'type-graphql';
import { WishCard } from '../entities/wishCard';
import { CustomError } from '../helper/customError';
import { handlePrismaError } from '../helper/prismaErrorHandler';
import { IContext } from '../types/Context';

export class WishCardResolver {
  @Query(() => WishCard)
  public async getWishCard(
    @Ctx() context: IContext,
    @Arg('id', { nullable: true }) id?: number,
  ): Promise<any> {
    try {
      if (!id) {
        throw new CustomError({
          message: 'No ID provided for wishCard',
          code: 'WishCardIdNotProvidedError',
        });
      }
      const query: {
        id: number;
      } = {
        id,
      };

      query.id = id;

      const wishCard = await context.prisma.wishcard.findUnique({
        where: {
          ...query,
        },
      });

      return wishCard;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
