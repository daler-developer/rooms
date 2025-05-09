import * as yup from "yup";
import { InferType } from "yup";
import { authRequired, composeResolvers, withValidation, handleErrors } from "../../lib/graphql/resolver-wrappers";
import { CustomContext } from "../../types";
import { User } from "../../../core/entities/User";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, __: Args, { roomService, userId }: CustomContext) => {
  return roomService.fetchUserRooms({ currentUserId: userId });
};

export default composeResolvers(handleErrors, authRequired, withValidation(validationSchema))(resolver);
