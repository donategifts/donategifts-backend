import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '../prisma/generated/type-graphql';
import { pubsub } from './helper/pubSub';
import { customAuthChecker } from './helper/authMiddleware';

export const schema = buildSchemaSync({
  resolvers,
  authChecker: customAuthChecker,
  pubSub: pubsub,
});
