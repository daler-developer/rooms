import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";
import { IncorrectPasswordGraphQLError } from "../../lib/graphql/errors";

const validationSchema = yup.object({
  input: yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    newPasswordRepeat: yup.string().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, { input }: Args, { userService, userId }: CustomContext) => {
  const me = await userService.fetchUserById(userId);

  if (me.password !== input.oldPassword) {
    throw new IncorrectPasswordGraphQLError();
  }

  const updatedUser = await userService.editUserPassword(userId, input.newPassword);

  return updatedUser;
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
