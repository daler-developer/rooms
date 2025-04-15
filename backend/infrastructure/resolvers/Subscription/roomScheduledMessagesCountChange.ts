import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE"]),
    (payload, variables, ctx: CustomContext) => {
      return variables.roomId === payload.roomId && ctx.userId === payload.userId;
    },
  ),
  resolve(payload) {
    return payload.count;
  },
};
