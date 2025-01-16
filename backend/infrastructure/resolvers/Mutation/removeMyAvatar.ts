import { CustomContext } from "../../types";
import { composeResolvers, authRequired, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const resolver = async (_, __, { userService, userId }: CustomContext) => {
  const updatedUser = await userService.removeUserAvatar(userId);

  return updatedUser;
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
