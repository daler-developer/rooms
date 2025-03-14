import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { IncorrectPasswordGraphQLError, MeIsBlockedGraphQLError, UserNotFoundGraphQLError } from "../../lib/graphql/errors";

const validationSchema = yup.object({
  input: yup.object({
    roomId: yup.number().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (_, args: Args, { userId, roomService }: CustomContext) => {
  await sleep(1500);
  await roomService.leaveRoom({ userId, roomId: args.input.roomId });

  return true;
};

export default composeResolvers(withValidation(validationSchema))(resolver);
