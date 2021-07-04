import 'reflect-metadata';
import * as cors from 'cors';
import * as express from 'express';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { CustomError } from './helper/customError';
import { generateSchema } from './schema';
import { wsAuthMiddleware } from './helper/jwt';
import { pubsub } from './helper/pubSub';
import { authMiddleware } from './helper/authMiddleware';
import { forwardAuthEndpoint } from './helper/wsMiddleware';
import { logger } from './helper/logger';

export const boot = async (): Promise<void> => {
  const prisma = new PrismaClient();

  const isProductionMode = process.env.NODE_ENV === 'production';

  const server = new ApolloServer({
    schema: await generateSchema,
    introspection: !isProductionMode,
    playground: false,
    context: ({ req }: { req: express.Request }) => {
      const userRole = req.user.role;

      return {
        ...req,
        userRole,
        prisma,
      };
    },
    subscriptions: {
      onConnect: (params, _ws, context) => {
        try {
          wsAuthMiddleware(params as any);
        } catch (e) {
          logger.error(`WS client connected error: ${e.message}`);
          throw e;
        }

        const { user } = params as any;
        if (user) {
          const userRoles = user.roles;
          return {
            ...context,
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
      //   !userId &&
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
  const app = express();

  app.use(cors());

  app.all('/forward-auth', forwardAuthEndpoint);

  app.use(authMiddleware);

  app.use('/graphiql', (_req, res) => {
    res.sendFile(join(__dirname, '../resources/graphiql.html'));
  });

  // eslint-disable-next-line no-unused-vars
  app.use(
    (
      err: CustomError,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.send({
        errors: [new ApolloError(err.message, err.code, { meta: err.meta })],
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

  app.listen(port, () => {
    logger.info(`Listening on port ${port} ... 🚀`);
    logger.info(
      `Server ready at http://localhost:${port}${server.graphqlPath}`,
    );
    logger.info(
      `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`,
    );
    logger.info(`GraphiQL ready at http://localhost:${port}/graphiql`);
  });
};
