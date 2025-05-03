import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_ONLINE_STATUS_CHANGE"]),
    (payload, variables, ctx: CustomContext) => {
      return variables.userIds.includes(payload.id);
    },
  ),
  resolve(payload) {
    return payload;
  },
};
