import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_PARTICIPANT_JOINED"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
};
