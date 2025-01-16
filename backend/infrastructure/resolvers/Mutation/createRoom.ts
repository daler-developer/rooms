import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { CreateRoomDto } from "../../../core/repositories/RoomRepository/dto/CreateRoomDto";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";
import pubsub from "../../pubsub";

const validationSchema = yup.object({
  input: yup.object({
    name: yup.string().required().min(3),
    usersInvitedIds: yup.array().required(),
    thumbnailUrl: yup.string().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolver = async (_, { input }: Args, { roomService, userId }: CustomContext) => {
  await sleep(3000);

  const room = await roomService.createRoom({
    name: input.name,
    creatorId: userId,
    invitedUsersIds: input.usersInvitedIds,
    thumbnailUrl: input.thumbnailUrl,
  });

  return room;
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
