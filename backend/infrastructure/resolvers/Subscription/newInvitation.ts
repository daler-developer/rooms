import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_INVITED_TO_ROOM"]),
    (payload, _, ctx) => {
      const res = payload.userId === ctx.userId;
      return payload.userId === ctx.userId;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
