import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    roomId: yup.number().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(() => res(1), 1000));

const resolver = async (_, args: Args, { invitationService, userId }: CustomContext) => {
  await sleep();
  return await invitationService.rejectInvitation(userId, args.input.roomId);
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
