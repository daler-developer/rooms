import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  email: yup.string().email().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { authService }: CustomContext) => {
  return authService.checkEmailAvailabilityForRegistration(args.email);
};

export default composeResolvers(withValidation(validationSchema))(resolver);
