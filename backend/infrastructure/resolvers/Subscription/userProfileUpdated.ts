// @ts-nocheck
import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    async function* (_, variables, ctx: CustomContext) {
      const user = ctx.userService.getUserById(variables.userId);

      yield user;

      const iterator = pubsub.asyncIterator(["USER_PROFILE_UPDATED"]);
      for await (const payload of iterator) {
        yield payload;
      }
    },
    (payload, variables) => {
      return variables.userId === payload.id;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
