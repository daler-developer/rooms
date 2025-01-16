import { GraphQLError } from "graphql";
import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import pubsub from "../../pubsub";

const validationSchema = yup.object({
  userId: yup.number().required(),
});

type Args = {
  input: InferType<typeof validationSchema>;
};

const unblockUser = async (_, { input }: Args, { userService }: CustomContext) => {
  const updatedUser = await userService.unblockUser(input.userId);

  pubsub.publish("ME_IS_BLOCKED_STATUS", {
    meIsBlockedStatus: {
      userId: input.userId,
      isBlocked: false,
    },
  });

  return updatedUser;
};

export default unblockUser;
