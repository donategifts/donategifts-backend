import 'reflect-metadata';
import * as cors from 'cors';
import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { GraphQLError, execute, subscribe } from 'graphql';
import { join } from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { CustomError } from './helper/customError';
import { schema } from './schema';
import { pubsub } from './helper/pubSub';
import { authMiddleware } from './helper/authMiddleware';
import { forwardAuthEndpoint, wsAuthMiddleware } from './helper/wsMiddleware';
import { logger } from './helper/logger';

const prisma = new PrismaClient();

const isProductionMode = process.env.NODE_ENV === 'production';

export const server = new ApolloServer({
  schema,
  introspection: !isProductionMode,
  context: ({ req }: { req: express.Request }) => {
    const userRole = req.user.role;

    return {
      ...req,
      userRole,
      prisma,
    };
  },
  formatError: (err: GraphQLError) => {
    if (err.originalError) {
      const { message, code, meta } = err.originalError as CustomError;

      const { locations, path } = err;

      logger.error(err.originalError);

      return {
        ...new ApolloError(message, code, { meta }),
        message,
        locations,
        path,
      };
    }

    logger.error(err);

    return err;
  },
  formatResponse: (response, { context }: any) => {
    // prevent introspection for anonymous users
    // if (
    //   (!context.userRole || context.userRole === Roles.GUEST) &&
    //   response.data &&
    //   (response.data.__schema || response.data.__type)
    // ) {
    //   delete response.data.__schema;
    //   delete response.data.__type;
    // }

    logger.info('request.user:', context.user);

    return response;
  },
});

export const boot = async (): Promise<void> => {
  await server.start();

  const app = express();

  app.use(cors());

  app.all('/forward-auth', forwardAuthEndpoint);

  app.use(authMiddleware);

  app.use('/graphiql', (_req, res) => {
    res.sendFile(join(__dirname, '../resources/graphiql.html'));
  });

  app.use(
    (
      error: CustomError,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.send({
        errors: [
          new ApolloError(error.message, error.code, { meta: error.meta }),
        ],
      });
    },
  );

  if (!process.env.PORT) {
    throw new CustomError({
      message: "Couldn't load port from env file",
    });
  }

  const port = parseInt(process.env.PORT, 10);

  server.applyMiddleware({ app });

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema: await schema,
      execute,
      subscribe,
      onConnect: (connectionParams: any, _webSocket: any, context: any) => {
        try {
          wsAuthMiddleware(connectionParams as any);
        } catch (error) {
          logger.error(`WS client connected error: ${error.message}`);
          throw error;
        }

        const { user } = connectionParams as any;
        if (user) {
          const userRoles = user.roles;
          return {
            ...context,
            // revisit pubsub since it's not recommended for production
            // maybe Redis or RabbitMQ?
            // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries
            pubsub,
            userRoles,
          };
        }
        return {
          ...context,
          pubsub,
        };
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  );

  // Shut down in the case of interrupt and termination signals
  // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => subscriptionServer.close());
  });

  httpServer.listen(port, () => {
    logger.info(`Listening on port ${port} ... 🚀`);
    logger.info(
      `Server ready at http://localhost:${port}${server.graphqlPath}`,
    );
    logger.info(
      `Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`,
    );
    logger.info(`GraphiQL ready at http://localhost:${port}/graphiql`);
  });
};
