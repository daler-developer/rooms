import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  id: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { messageService }: CustomContext) => {
  return messageService.fetchMessageById(args.id);
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
