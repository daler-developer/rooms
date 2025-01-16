import { GraphQLError, GraphQLFieldResolver } from "graphql";
import { CustomContext } from "../../types";
import { MeIsBlockedGraphQLError, NotAuthenticatedGraphQLError } from "./errors";

export const withValidation = (schema) => {
  return (resolver) => {
    return async (parent, args, context, info) => {
      const validatedArgs = await schema.validate(args, { abortEarly: false });

      return resolver(parent, validatedArgs, context, info);
    };
  };
};

export const authRequired = (resolver) => {
  return async (parent, args, context, info) => {
    if (!context.userId) {
      throw new NotAuthenticatedGraphQLError();
    }

    return resolver(parent, args, context, info);
  };
};

export const checkBlockedStatus = (resolver: GraphQLFieldResolver<unknown, unknown, unknown>) => {
  return async (parent, args, context: CustomContext, info) => {
    const { userService, userId } = context;

    const user = await userService.fetchUserById(userId);

    if (user.isBlocked) {
      throw new MeIsBlockedGraphQLError();
    }

    return resolver(parent, args, context, info);
  };
};

export const handleErrors = (resolver: any) => {
  return async (parent: unknown, args: unknown, context: CustomContext, info: unknown) => {
    try {
      return await resolver(parent, args, context, info);
    } catch (e) {
      throw new GraphQLError(e.message, {
        extensions: {
          code: e.code,
          payload: e.payload || null,
        },
      });
    }
  };
};

export const composeResolvers = (...funcs) => {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args)),
  );
};
