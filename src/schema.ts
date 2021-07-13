import { buildSchemaSync } from 'type-graphql';
import { pubsub } from './helper/pubSub';
import { UserResolver } from './resolver/userResolver';
import { customAuthChecker } from './helper/authMiddleware';
import { AuthResolver } from './resolver/authResolver';

export const schema = buildSchemaSync({
  resolvers: [UserResolver, AuthResolver],
  authChecker: customAuthChecker,
  pubSub: pubsub,
});
