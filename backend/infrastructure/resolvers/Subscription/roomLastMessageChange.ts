import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_LAST_MESSAGE_CHANGE"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
  async resolve(payload, _, ctx: CustomContext) {
    return payload.message;
  },
};
