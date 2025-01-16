import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["REPLIED_TO_MY_INVITATION"]),
    (payload, _, ctx) => {
      return payload.repliedToMyInvitation.invitation.inviterId === ctx.userId;
    },
  ),
};
