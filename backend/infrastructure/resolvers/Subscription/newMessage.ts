import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["NEW_MESSAGE"]),
    async (payload, variables, ctx: CustomContext) => {
      const participants = await ctx.userService.fetchRoomParticipants(payload.newMessage.message.roomId);

      const isParticipant = Boolean(participants.find((p) => p.id === ctx.userId));
      const isFromSameSession = ctx.sessionId === payload.newMessage.message.sessionId;

      if (isParticipant) {
        if (variables.skipFromCurrentSession) {
          return !isFromSameSession;
        }

        return true;
      }

      return false;
    },
  ),
};
