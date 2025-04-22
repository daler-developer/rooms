import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_NEW_MESSAGES_COUNT_CHANGE"]),
    (payload, variables, ctx: CustomContext) => {
      return variables.roomId === payload.roomId && payload.userId === ctx.userId;
    },
  ),
  async resolve(payload, _, ctx: CustomContext) {
    return payload.count;
  },
};
