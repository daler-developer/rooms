import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

type Parent = Room;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const resolver = async (parent: Parent, _: Args, { userService }: CustomContext) => {
  const result = await userService.fetchRoomParticipants(parent.id);

  return result;
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
