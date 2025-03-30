import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_TYPING_START"]),
    (payload, variables) => {
      return variables.roomId === payload.roomId;
    },
  ),
  async resolve(payload, _, ctx: CustomContext) {
    return await ctx.userService.fetchUserById(payload.userId);
  },
};
