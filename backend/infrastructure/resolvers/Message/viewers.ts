import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Message } from "../../../core/entities/Message";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (parent: Message, __, { messageService }: CustomContext) => {
  await sleep(300);
  return messageService.fetchMessageViewers(parent.id);
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
