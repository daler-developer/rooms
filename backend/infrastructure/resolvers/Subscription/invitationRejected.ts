import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_REJECTED_INVITATION"]),
    (payload, _, ctx) => {
      return payload.inviterId === ctx.userId;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
