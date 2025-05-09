import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  roomId: yup.number().required(),
  messageIds: yup.array().of(yup.number().required()).required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userId, messageService }: CustomContext) => {
  await messageService.deleteMessages({ currentUserId: userId, messageIds: args.messageIds });

  return true;
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
