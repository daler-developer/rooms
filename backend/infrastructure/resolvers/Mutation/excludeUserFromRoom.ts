import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  userId: yup.number().required(),
  roomId: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

const resolver = async (_, args: Args, { roomService }: CustomContext) => {
  // await sleep();
  return await roomService.excludeUserFromRoom(args.roomId, args.userId);
};

export default composeResolvers(withValidation(validationSchema))(resolver);
