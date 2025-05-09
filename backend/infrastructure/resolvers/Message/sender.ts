import { CustomContext } from "../../types";
import { authRequired, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Message } from "../../../core/entities/Message";

const resolver = async (parent: Message, __, { userService }: CustomContext) => {
  return await userService.fetchUserById(parent.senderId);
};

export default composeResolvers(authRequired)(resolver);
