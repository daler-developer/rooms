import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    roomId: yup.number().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { invitationService, userId }: CustomContext) => {
  return await invitationService.rejectInvitation({ currentUserId: userId, roomId: args.input.roomId });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
