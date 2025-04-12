import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
  resolve(payload) {
    return payload.count;
  },
};
