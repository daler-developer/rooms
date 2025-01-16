import * as yup from "yup";

import { authRequired, composeResolvers, withValidation } from "../../lib/graphql/resolver-wrappers";
import { CustomContext } from "../../types";
import { InferType } from "yup";

const validationSchema = yup.object({
  input: yup.object({
    limit: yup.number().required(),
    offset: yup.number().required(),
    sortBy: yup.string().nullable(),
    search: yup.string(),
  }),
});

type Args = InferType<typeof validationSchema>;

const sleep = () => new Promise((res) => setTimeout(() => res(null), 1000));

const resolver = async (_, args: Args, { roomService, userId }: CustomContext) => {
  const rooms = await roomService.fetchUserRooms(userId, {
    search: args.input.search,
    offset: args.input.offset,
    limit: args.input.limit,
    sortBy: args.input.sortBy as any,
  });

  return rooms;
};

export default composeResolvers(authRequired, withValidation(validationSchema))(resolver);
