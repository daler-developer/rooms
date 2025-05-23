import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
  async resolve(payload) {
    return payload.count;
  },
};
