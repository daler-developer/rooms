import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers } from "../../lib/graphql/resolver-wrappers";
import { IncorrectPasswordGraphQLError, MeIsBlockedGraphQLError, UserNotFoundGraphQLError } from "../../lib/graphql/errors";

const validationSchema = yup.object({
  input: yup.object({
    email: yup.string().required().min(3),
    password: yup.string().required().min(3),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService, authService }: CustomContext) => {
  const user = await userService.getUserByEmail(args.input.email);

  if (!user) {
    throw new UserNotFoundGraphQLError();
  }

  if (user.password !== args.input.password) {
    throw new IncorrectPasswordGraphQLError();
  }

  if (user.isBlocked) {
    throw new MeIsBlockedGraphQLError();
  }

  const token = authService.createAuthToken(user.id);

  return {
    user,
    token,
  };
};

export default composeResolvers(withValidation(validationSchema))(resolver);
