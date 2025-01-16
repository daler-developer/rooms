import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_PENDING_INVITATIONS_COUNT_CHANGE"]),
    (payload, variables) => {
      return variables.roomId === payload.roomPendingInvitationsCountChange.id;
    },
  ),
};
