import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  email: yup.string().email().required(),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(res, 1500));

const resolver = async (_, args: Args, { authService }: CustomContext) => {
  // await sleep();
  return authService.checkEmailAvailabilityForRegistration(args.email);
};

export default composeResolvers(withValidation(validationSchema))(resolver);
