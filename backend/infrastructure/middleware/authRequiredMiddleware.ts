import { CustomContext } from "../types";
import { GraphQLError } from "graphql";

const authRequiredMiddleware = (nextResolver: any) => {
  return async (root, args, context: CustomContext, info) => {
    if (!context.userId) {
      throw new GraphQLError("Not authenticated");
    }

    return await nextResolver(root, args, context, info);
  };
};

export default authRequiredMiddleware;
