import 'reflect-metadata';
import { createServer } from 'http';
import cors from 'cors';
import express from 'express';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import prisma from './db/prisma';
import { CustomError } from './helper/customError';
import { schema } from './schema';
import { authMiddleware } from './helper/authMiddleware';
import { logger } from './helper/logger';

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
    logger.info('request.user:', context.user);

    return response;
  },
});

export const boot = async (): Promise<void> => {
  await server.start();

  const app = express();

  app.use(cors());

  app.use(authMiddleware);

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

  // const subscriptionServer = SubscriptionServer.create(
  //   {
  //     schema,
  //     execute,
  //     subscribe,
  //     onConnect: (connectionParams: any, _webSocket: any, context: any) => {
  //       const { user } = connectionParams as any;
  //       if (user) {
  //         const userRoles = user.roles;
  //         return {
  //           ...context,
  //           // revisit pubsub since it's not recommended for production
  //           // maybe Redis or RabbitMQ?
  //           // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries
  //           pubsub,
  //           userRoles,
  //         };
  //       }
  //       return {
  //         ...context,
  //         pubsub,
  //       };
  //     },
  //   },
  //   {
  //     server: httpServer,
  //     path: server.graphqlPath,
  //   },
  // );

  // Shut down in the case of interrupt and termination signals
  // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
  // ['SIGINT', 'SIGTERM'].forEach((signal) => {
  //   process.on(signal, () => subscriptionServer.close());
  // });

  httpServer.listen(port, () => {
    logger.info(`Listening on port ${port} ... 🚀`);
    logger.info(
      `Server ready at http://localhost:${port}${server.graphqlPath}`,
    );
    // logger.info(
    //   `Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`,
    // );
    logger.info(`GraphiQL ready at http://localhost:${port}/graphiql`);
  });
};
