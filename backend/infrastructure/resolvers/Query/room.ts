import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  id: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { roomService, userId }: CustomContext) => {
  return await roomService.fetchRoomById({ roomId: args.id, currentUserId: userId });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
