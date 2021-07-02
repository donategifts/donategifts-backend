import { buildSchema } from 'type-graphql';
import { pubsub } from './helper/pubSub';
import { UserResolver } from './resolver/userResolver';
import { customAuthChecker } from './helper/authMiddleware';

export const generateSchema = buildSchema({
  resolvers: [UserResolver],
  authChecker: customAuthChecker,
  pubSub: pubsub,
});
