import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  messageIds: yup.array().of(yup.number().required()),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { messageService, userId }: CustomContext) => {
  await messageService.sendScheduledMessagesNow({ messageIds: args.messageIds, userId });

  return true;
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
