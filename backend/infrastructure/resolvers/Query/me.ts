import { CustomContext } from "../../types";
import { authRequired, composeResolvers, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const resolver = async (_, __, { userService, userId }: CustomContext) => {
  const user = await userService.getUserById(userId);

  return user;
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
