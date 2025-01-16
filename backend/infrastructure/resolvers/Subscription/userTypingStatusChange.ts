import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_TYPING_STATUS_CHANGE"]),
    (payload, variables, ctx: CustomContext) => {
      return variables.roomId === payload.userTypingStatusChange.roomId;
    },
  ),
};
