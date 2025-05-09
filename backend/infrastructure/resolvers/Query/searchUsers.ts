import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  filter: yup.object({
    q: yup.string(),
    offset: yup.number().required().min(0),
    limit: yup.number().required().min(1),
    excludeIds: yup.array().of(yup.number()).required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const resolver = async (_, args: Args, { userService }: CustomContext) => {
  return userService.fetchUsers({ offset: args.filter.offset, limit: args.filter.limit, excludeIds: args.filter.excludeIds, q: args.filter.q });
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
