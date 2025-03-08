import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, handleErrors } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    newFirstName: yup.string().min(3).max(20).required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userId, userService }: CustomContext) => {
  return await userService.editFirstName({ userId, newFirstName: args.input.newFirstName });
};

export default composeResolvers(handleErrors, authRequired, withValidation(validationSchema))(resolver);
