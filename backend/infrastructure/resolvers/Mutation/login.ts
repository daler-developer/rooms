import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers, handleErrors } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    email: yup.string().required().min(3),
    password: yup.string().required().min(3),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { authService, res }: CustomContext) => {
  const { user, token } = await authService.login({ email: args.input.email, password: args.input.password });

  res.cookie("token", token);

  return {
    user,
    token,
  };
};

export default composeResolvers(handleErrors, withValidation(validationSchema))(resolver);
