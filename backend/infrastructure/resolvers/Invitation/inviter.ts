import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const resolver = async (parent, __, { userService }: CustomContext) => {
  return await userService.fetchUserById(parent.inviterId);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
