import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ME_IS_BLOCKED_STATUS"]),
    (payload, _, ctx) => {
      return ctx.userId === payload.meIsBlockedStatus.userId;
    },
  ),
};
