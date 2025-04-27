import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  messageId: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(res, 1500));

const resolver = async (_, args: Args, { messageService, userId }: CustomContext) => {
  return await messageService.markMessageAsViewed({ messageId: args.messageId, currentUserId: userId });
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
