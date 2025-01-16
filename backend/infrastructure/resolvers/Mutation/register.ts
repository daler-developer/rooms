import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { IncorrectPasswordGraphQLError, MeIsBlockedGraphQLError, UserNotFoundGraphQLError } from "../../lib/graphql/errors";

const validationSchema = yup.object({
  input: yup.object({
    email: yup.string().required().min(3),
    password: yup.string().required().min(3),
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    profilePictureUrl: yup.string(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService, authService }: CustomContext) => {
  const user = await userService.createUser({
    email: args.input.email,
    firstName: args.input.firstName,
    lastName: args.input.lastName,
    password: args.input.password,
    profilePictureUrl: args.input.profilePictureUrl,
  });

  const token = await authService.createAuthToken(user.id);

  return {
    user,
    token,
  };
};

export default composeResolvers(withValidation(validationSchema))(resolver);
