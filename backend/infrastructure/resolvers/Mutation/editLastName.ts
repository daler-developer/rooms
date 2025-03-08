import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
    newLastName: yup.string().min(3).max(20).required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userId, userService }: CustomContext) => {
  return await userService.editLastName({ userId, newLastName: args.input.newLastName });
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
