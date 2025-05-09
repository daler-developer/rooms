import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Message } from "../../../core/entities/Message";

const resolver = async (parent: Message, __, { messageService }: CustomContext) => {
  return messageService.fetchMessageViewers(parent.id);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
