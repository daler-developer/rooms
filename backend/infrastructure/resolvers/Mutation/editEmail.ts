import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, handleErrors, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  newEmail: yup.string().required(),
});

type Args = {
  input: InferType<typeof validationSchema>;
};

const resolver = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  return userService.editEmail({ currentUserId: userId, newEmail: input.newEmail });
};

export default composeResolvers(handleErrors, withValidation(validationSchema))(resolver);
