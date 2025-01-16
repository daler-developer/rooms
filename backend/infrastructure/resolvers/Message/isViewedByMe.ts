import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Message } from "../../../core/entities/Message";

const resolver = async (parent: Message, __, { userId, messageService }: CustomContext) => {
  return await messageService.isMessageViewedByUser(parent.id, userId);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
