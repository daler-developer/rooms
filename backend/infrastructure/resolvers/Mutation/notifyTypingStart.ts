import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers, handleErrors } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  roomId: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService, userId, sessionId }: CustomContext) => {
  await userService.notifyTypingStart({ sessionId, currentUserId: userId, roomId: args.roomId });

  return true;
};

export default composeResolvers(handleErrors, withValidation(validationSchema))(resolver);
