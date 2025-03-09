// @ts-nocheck
import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    async function* (_, __, ctx: CustomContext) {
      const user = ctx.userService.getUserById(ctx.userId);

      yield user;

      const iterator = pubsub.asyncIterator(["USER_INVITATIONS_COUNT_UPDATED"]);
      for await (const payload of iterator) {
        yield payload;
      }
    },
    (payload, _, ctx) => {
      return payload.id === ctx.userId;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
