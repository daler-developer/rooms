import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  id: yup.number().required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (_, args: Args, { roomService }: CustomContext) => {
  await sleep(300);
  const room = await roomService.fetchRoomById(args.id);

  return room;
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
