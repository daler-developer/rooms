import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  roomId: yup.number().required(),
  invitedUsersIds: yup.array().of(yup.number().required()).required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (_, args: Args, { userId, roomService }: CustomContext) => {
  await roomService.inviteUsersToRoom({ roomId: args.roomId, inviterId: userId, invitedUsersIds: args.invitedUsersIds });

  return true;
};

export default composeResolvers(withValidation(validationSchema))(resolver);
