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

const blockUser = async (_, { input }: Args, { userService }: CustomContext) => {
  const updatedUser = await userService.blockUser(input.userId);

  pubsub.publish("ME_IS_BLOCKED_STATUS", {
    meIsBlockedStatus: {
      userId: input.userId,
      isBlocked: true,
    },
  });

  return updatedUser;
};

export default blockUser;
