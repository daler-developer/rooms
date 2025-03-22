import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["NEW_ROOM"]),
    async (payload, _, ctx: CustomContext) => {
      return payload.creatorId === ctx.userId;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
