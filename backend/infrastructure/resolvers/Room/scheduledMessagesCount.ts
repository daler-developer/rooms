import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";
import { Room } from "../../../core/entities/Room";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

type Parent = Room;

const resolver = async (parent: Parent, _: Args, { messageService, userId }: CustomContext) => {
  return await messageService.fetchScheduledMessagesCount({ roomId: parent.id, userId });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
