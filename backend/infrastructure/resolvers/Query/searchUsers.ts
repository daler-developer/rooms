import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  filter: yup.object({
    q: yup.string(),
    offset: yup.number().required().min(0),
    limit: yup.number().required().min(1),
    excludeMe: yup.boolean().required(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(() => res(1), 1500));

const resolver = async (_, args: Args, { userService, userId }: CustomContext) => {
  await sleep();

  const excludeIds: number[] = [];

  if (args.filter.excludeMe) {
    excludeIds.push(userId);
  }

  return userService.fetchUsers({ offset: args.filter.offset, limit: args.filter.limit, excludeIds, q: args.filter.q });
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
