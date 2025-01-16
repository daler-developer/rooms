// @ts-nocheck
import "reflect-metadata";
import { createServer } from "http";
import * as express from "express";
import * as cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import getResolvers from "./infrastructure/resolvers";
import { readFileSync } from "fs";
import client from "./infrastructure/db/client";
import redisClient from "./infrastructure/db/redisClient";
import { iocContainer } from "./inversify.config";
import AuthService from "./core/services/AuthService/AuthService";
import { TYPES } from "./types";
import UserService from "./core/services/UserService/UserService";
import { CustomContext } from "./infrastructure/types";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { useServer } from "graphql-ws/lib/use/ws";
import { RoomService } from "./core/services/RoomService/RoomService";
import InvitationService from "./core/services/InvitationService/InvitationService";
import { MessageService } from "./core/services/MessageService/MessageService";
import { MessageImageService } from "./core/services/MessageImageService/MessageImageService";
import { setMaxListeners } from "events";
import db from "./infrastructure/db";
import { messages } from "./infrastructure/entities/Message";
import { eq } from "drizzle-orm";

setMaxListeners(1000);

const start = async () => {
  await redisClient.on("error", (err) => console.log("Redis Client Error", err)).connect();

  const PORT = 5003;

  const app = express();

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const typeDefs = gql(
    readFileSync("infrastructure/schema.graphql", {
      encoding: "utf-8",
    }),
  );

  const resolvers = await getResolvers();

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const serverCleanup = useServer(
    {
      schema,
      context(ctx, msg, args) {
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);
        const userService = iocContainer.get<UserService>(TYPES.UserService);
        const roomService = iocContainer.get<RoomService>(TYPES.RoomService);
        const invitationService = iocContainer.get<InvitationService>(TYPES.InvitationService);
        const messageService = iocContainer.get<MessageService>(TYPES.MessageService);
        const messageImageService = iocContainer.get<MessageImageService>(TYPES.MessageImageService);

        const result = {
          authService,
          userService,
          roomService,
          invitationService,
          messageService,
          messageImageService,
        };

        const authToken = ctx.connectionParams.authToken;

        if (authToken) {
          try {
            const { userId } = authService.decodeAuthToken(authToken);
            result.userId = userId;
          } catch {
            return result;
          }
        }

        return result;
      },
      onConnect(ctx) {
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);
        const userService = iocContainer.get<UserService>(TYPES.UserService);

        const authToken = ctx.connectionParams.authToken;

        const { userId } = authService.decodeAuthToken(authToken);

        userService.updateUserOnlineStatus(userId, { isOnline: true });
      },
      onDisconnect(ctx) {
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);
        const userService = iocContainer.get<UserService>(TYPES.UserService);

        const authToken = ctx.connectionParams.authToken;

        const { userId } = authService.decodeAuthToken(authToken);

        userService.updateUserOnlineStatus(userId, { isOnline: false });
      },
    },
    wsServer,
  );

  // app.use(cors());
  // app.use(express.json());

  const server = new ApolloServer<CustomContext>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  await client.connect();

  // const [message] = await db.select().from(messages).where(eq(messages.id, 277));

  // await db
  //   .update(messages)
  //   .set({
  //     scheduledAt: new Date().toISOString(),
  //   })
  //   .where(eq(messages.id, 277));

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      async context({ req }) {
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);
        const userService = iocContainer.get<UserService>(TYPES.UserService);
        const roomService = iocContainer.get<RoomService>(TYPES.RoomService);
        const invitationService = iocContainer.get<InvitationService>(TYPES.InvitationService);
        const messageService = iocContainer.get<MessageService>(TYPES.MessageService);
        const messageImageService = iocContainer.get<MessageImageService>(TYPES.MessageImageService);

        const ctx = {
          authService,
          userService,
          roomService,
          invitationService,
          messageService,
          messageImageService,
        };

        const authToken = req.header("authorization");

        if (authToken) {
          try {
            const { userId } = authService.decodeAuthToken(authToken);
            ctx.userId = userId;
          } catch {
            return ctx;
          }
        }

        return ctx;
      },
    }),
  );

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

start();
