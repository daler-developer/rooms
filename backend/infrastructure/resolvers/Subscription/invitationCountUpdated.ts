// @ts-nocheck
import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_INVITATIONS_COUNT_UPDATED"]),
    (payload, _, ctx) => {
      return payload.id === ctx.userId;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
