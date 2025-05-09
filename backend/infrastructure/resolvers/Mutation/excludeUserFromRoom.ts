import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  userId: yup.number().required(),
  roomId: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userId, roomService }: CustomContext) => {
  return await roomService.excludeUserFromRoom({ currentUserId: userId, roomId: args.roomId, userId: args.userId });
};

export default composeResolvers(withValidation(validationSchema))(resolver);
