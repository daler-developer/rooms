import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ME_IS_INVITED_TO_ROOM"]),
    (payload, _, ctx) => {
      return payload.meIsInvitedToRoom.userId === ctx.userId;
    },
  ),
};
