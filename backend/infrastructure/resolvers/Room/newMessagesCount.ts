import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

type Parent = Room;

const resolver = async (parent: Parent, args: Args, { roomService, userId }: CustomContext) => {
  return await roomService.fetchRoomNewMessagesCount({ roomId: parent.id, userId });
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
