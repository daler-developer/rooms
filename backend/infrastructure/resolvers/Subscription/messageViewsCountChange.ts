import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["MESSAGE_VIEWS_COUNT_CHANGE"]),
    (payload, variables) => {
      return variables.messageId === payload.messageId;
    },
  ),
  async resolve(payload, _, ctx: CustomContext) {
    return payload.count;
  },
};
