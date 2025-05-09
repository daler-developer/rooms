import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["NEW_MESSAGE"]),
    async (payload, variables, ctx: CustomContext) => {
      const participants = await ctx.userService.fetchRoomParticipants(payload.roomId);

      const isParticipant = Boolean(participants.find((p) => p.id === ctx.userId));
      const isFromSameSession = ctx.sessionId === payload.sessionId;

      if (isParticipant) {
        if (variables.skipFromCurrentSession) {
          return !isFromSameSession;
        }

        return true;
      }

      return false;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
