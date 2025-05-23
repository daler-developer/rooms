import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    roomId: yup.number().required(),
    text: yup.string().required(),
    imageUrls: yup.array().of(yup.string().required()).required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { messageService, userId, sessionId }: CustomContext) => {
  return await messageService.sendMessage({
    senderId: userId,
    roomId: args.input.roomId,
    text: args.input.text,
    imageUrls: args.input.imageUrls,
    sessionId: sessionId!,
  });
};

export default composeResolvers(withValidation(validationSchema))(resolver);
