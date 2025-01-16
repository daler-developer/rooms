import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { IncorrectPasswordGraphQLError, MeIsBlockedGraphQLError, UserNotFoundGraphQLError } from "../../lib/graphql/errors";
import { CreateMessageDto } from "../../../core/repositories/MessageRepository/dto/CreateMessageDto";

const validationSchema = yup.object({
  input: yup.object({
    roomId: yup.number().required(),
    text: yup.string().required(),
    imageUrls: yup.array().of(yup.string().required()).required(),
    scheduleAt: yup.string().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (_, args: Args, { messageService, userId, sessionId }: CustomContext) => {
  await sleep(2000);
  return await messageService.scheduleMessage({
    senderId: userId,
    roomId: args.input.roomId,
    text: args.input.text,
    imageUrls: args.input.imageUrls,
    scheduleAt: args.input.scheduleAt,
    sessionId: sessionId!,
  });
};

export default composeResolvers(withValidation(validationSchema))(resolver);
