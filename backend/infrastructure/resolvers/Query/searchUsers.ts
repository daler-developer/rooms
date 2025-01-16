import * as yup from "yup";
import { InferType } from "yup";
import { CustomContext } from "../../types";
import { composeResolvers, authRequired, withValidation, checkBlockedStatus } from "../../lib/graphql/resolver-wrappers";

const validationSchema = yup.object({
  input: yup.object({
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

  if (args.input.excludeMe) {
    excludeIds.push(userId);
  }

  const users = await userService.fetchUsers({ offset: args.input.offset, limit: args.input.limit, excludeIds, q: args.input.q });

  const allUsers = await userService.fetchUsersCount({ offset: 0, excludeIds, q: args.input.q });

  return {
    users,
    hasMore: allUsers.length - (users.length + args.input.offset) > 0,
  };
};

export default composeResolvers(authRequired, checkBlockedStatus, withValidation(validationSchema))(resolver);
