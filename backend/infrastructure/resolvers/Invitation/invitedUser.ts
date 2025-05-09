import { CustomContext } from "../../types";
import { authRequired, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const resolver = async (parent, __, { userService }: CustomContext) => {
  return await userService.fetchUserById(parent.userId);
};

export default composeResolvers(authRequired)(resolver);
