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

setMaxListeners(1000);

const buildContext = ({ authToken, sessionToken }: { authToken: string; sessionToken: string }): CustomContext => {
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

  if (sessionToken) {
    const { sessionId } = authService.decodeSessionToken(sessionToken);

    ctx.sessionId = sessionId || null;
  }

  if (authToken) {
    try {
      const { userId } = authService.decodeAuthToken(authToken);
      ctx.userId = userId;
    } catch {
      return ctx;
    }
  }

  return ctx;
};

const start = async () => {
  await redisClient.on("error", (err) => console.log("Redis Client Error", err)).connect();

  const PORT = 5003;

  const app = express();

  const httpServer = createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });

  wsServer.on("close", () => {
    console.log("connection");
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
        const sessionToken = ctx.connectionParams.sessionToken;

        if (authToken) {
          try {
            const { userId } = authService.decodeAuthToken(authToken);
            result.userId = userId;
          } catch {
            return result;
          }
        }

        if (sessionToken) {
          try {
            const { sessionId } = authService.decodeSessionToken(sessionToken);
            result.sessionId = sessionId;
          } catch (e) {}
        }

        return result;
      },
      onConnect(ctx) {
        console.log("connect");
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);

        const authToken = ctx.connectionParams.authToken;
        const sessionToken = ctx.connectionParams.sessionToken;

        const { userId } = authService.decodeAuthToken(authToken);
        const { sessionId } = authService.decodeSessionToken(sessionToken);

        authService.handleUserConnect({ userId, sessionId });
        return true;
      },
      onDisconnect(ctx) {
        console.log("disconnect");
        const authService = iocContainer.get<AuthService>(TYPES.AuthService);

        const authToken = ctx.connectionParams.authToken;
        const sessionToken = ctx.connectionParams.sessionToken;

        const { userId } = authService.decodeAuthToken(authToken);
        const { sessionId } = authService.decodeSessionToken(sessionToken);

        authService.handleUserDisconnect({ currentUserId: userId, sessionId });
      },
    },
    wsServer,
  );

  app.use(cors());
  app.use(express.json());

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
    formatError(error) {
      return {
        message: error.message,
        code: error.extensions.code,
        payload: error.extensions.payload,
      };
    },
  });

  await server.start();
  await client.connect();

  const messageService = iocContainer.get<MessageService>(TYPES.MessageService);

  messageService.sendScheduledMessagesAtScheduledAt();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      async context({ req }) {
        const authToken = req.header("authorization");
        const sessionToken = req.header("session");

        return buildContext({ authToken, sessionToken });
        // const authService = iocContainer.get<AuthService>(TYPES.AuthService);
        // const userService = iocContainer.get<UserService>(TYPES.UserService);
        // const roomService = iocContainer.get<RoomService>(TYPES.RoomService);
        // const invitationService = iocContainer.get<InvitationService>(TYPES.InvitationService);
        // const messageService = iocContainer.get<MessageService>(TYPES.MessageService);
        // const messageImageService = iocContainer.get<MessageImageService>(TYPES.MessageImageService);
        //
        // const ctx = {
        //   authService,
        //   userService,
        //   roomService,
        //   invitationService,
        //   messageService,
        //   messageImageService,
        //   res,
        // };
        //
        // const authToken = req.header("authorization");
        // const sessionToken = req.header("session");
        //
        // if (sessionToken) {
        //   const { sessionId } = authService.decodeSessionToken(sessionToken);
        //
        //   ctx.sessionId = sessionId || null;
        // }
        //
        // if (authToken) {
        //   try {
        //     const { userId } = authService.decodeAuthToken(authToken);
        //     ctx.userId = userId;
        //   } catch {
        //     return ctx;
        //   }
        // }
        //
        // return ctx;
      },
    }),
  );

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};

start();
