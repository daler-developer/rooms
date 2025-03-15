import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { Room } from "../../../core/entities/Room";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["ROOM_CREATED"]),
    (payload: Room, variables, ctx: CustomContext) => {
      const isCreator = payload.creatorId === ctx.userId;
      const createdByCurrentSession = payload.sessionId === ctx.sessionId;

      if (variables.skipFromCurrentSession) {
        return isCreator && !createdByCurrentSession;
      } else {
        return isCreator;
      }
    },
  ),
  resolve(payload) {
    return payload;
  },
};
