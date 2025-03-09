import * as yup from "yup";
import { InferType } from "yup";
import { authRequired, composeResolvers, withValidation, handleErrors } from "../../lib/graphql/resolver-wrappers";
import { CustomContext } from "../../types";
import { User } from "../../../core/entities/User";

const validationSchema = yup.object({});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(() => res(null), 1000));

const resolver = async (parent: User, _: Args, { roomService }: CustomContext) => {
  return roomService.fetchUserRooms({ userId: parent.id });
};

export default composeResolvers(handleErrors, authRequired, withValidation(validationSchema))(resolver);
