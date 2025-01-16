import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_EXCLUDED_FROM_ROOM"]),
    (payload, variables, ctx) => {
      return ctx.userId === payload.user.id;
    },
  ),
  resolve(payload) {
    return payload.room;
  },
};
