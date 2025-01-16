import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { Message } from "../../../core/entities/Message";

const resolver = async (parent: Message, __, { messageImageService }: CustomContext) => {
  const images = await messageImageService.fetchMessageImages(parent.id);

  return images;
};

export default composeResolvers(authRequired, checkBlockedStatus)(resolver);
