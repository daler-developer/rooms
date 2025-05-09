import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["NEW_SCHEDULED_MESSAGE"]),
    async (payload, variables, ctx: CustomContext) => {
      const isSender = ctx.userId === payload.senderId;
      const isFromSameSession = ctx.sessionId === payload.sessionId;

      if (variables.skipFromCurrentSession) {
        return isSender && !isFromSameSession;
      } else {
        return isSender;
      }
    },
  ),
  resolve(payload) {
    return payload;
  },
};
