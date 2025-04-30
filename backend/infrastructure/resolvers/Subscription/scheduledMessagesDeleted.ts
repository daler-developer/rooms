import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["SCHEDULED_MESSAGES_DELETED"]),
    (payload, variables, ctx) => {
      const iSender = ctx.userId === payload.userId;
      return iSender && variables.roomId === payload.roomId;
    },
  ),
  resolve(payload) {
    payload.messageIds;
  },
};
