// @ts-nocheck
import { withFilter } from "graphql-subscriptions";
import pubsub from "../../pubsub";
import { CustomContext } from "../../types";

export default {
  subscribe: withFilter(
    () => pubsub.asyncIterator(["USER_PROFILE_UPDATED"]),
    (payload, variables) => {
      return variables.userId === payload.id;
    },
  ),
  resolve(payload) {
    return payload;
  },
};
