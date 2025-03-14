import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

type Parent = Room;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const resolver = async (parent: Parent, args: Args, { messageService }: CustomContext) => {
  await sleep();
  return await messageService.fetchInvitedUsers(parent.id);
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
