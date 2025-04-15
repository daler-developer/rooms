import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["MESSAGES_DELETED"]),
    (payload, variables, ctx) => {
      return variables.roomId === payload.roomId;
    },
  ),
  resolve(payload) {
    return {
      messageIds: payload.messageIds,
    };
  },
};
