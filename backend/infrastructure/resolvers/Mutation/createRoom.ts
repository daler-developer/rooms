import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    name: yup.string().required().min(3),
    usersInvitedIds: yup.array().required(),
    thumbnailUrl: yup.string().nullable(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, { input }: Args, { roomService, userId, sessionId }: CustomContext) => {
  return await roomService.createRoom({
    name: input.name,
    creatorId: userId,
    invitedUsersIds: input.usersInvitedIds,
    thumbnailUrl: input.thumbnailUrl,
    sessionId,
  });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
