import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  isTyping: yup.boolean().required(),
  roomId: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService, userId, sessionId }: CustomContext) => {
  await userService.notifyUserTypingStatusChange({ userId, sessionId, roomId: args.roomId, isTyping: args.isTyping });

  return true;
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
