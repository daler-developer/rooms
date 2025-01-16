import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["MESSAGE_VIEWED"]),
    (payload, variables, ctx) => {
      return payload.messageViewed.message.id === variables.messageId;
    },
  ),
};
