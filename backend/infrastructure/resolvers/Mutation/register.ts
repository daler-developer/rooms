import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { withValidation, composeResolvers, handleErrors } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup
    .object({
      email: yup.string().required().min(3),
      password: yup.string().required().min(3),
      firstName: yup.string().required().min(3),
      lastName: yup.string().required().min(3),
      profilePictureUrl: yup.string().optional(),
    })
    .required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(res, 1500));

const resolver = async (_, args: Args, { authService }: CustomContext) => {
  // await sleep();
  return authService.register({
    email: args.input.email,
    firstName: args.input.firstName,
    lastName: args.input.lastName,
    password: args.input.password,
    profilePictureUrl: args.input.profilePictureUrl,
  });
};

export default composeResolvers(handleErrors, withValidation(validationSchema))(resolver);
