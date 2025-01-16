import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_PARTICIPANT_LEFT"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
};
