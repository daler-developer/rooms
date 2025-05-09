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
  return await userService.resetPassword({ currentUserId: userId, newPassword: input.newPassword });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
