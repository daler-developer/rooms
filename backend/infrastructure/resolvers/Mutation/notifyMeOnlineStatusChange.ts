import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { authRequired, checkBlockedStatus, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  status: yup.string().required(),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService, userId }: CustomContext) => {};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
