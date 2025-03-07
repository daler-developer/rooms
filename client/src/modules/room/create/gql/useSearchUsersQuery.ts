import { SEARCH_USERS } from "./index";
import { type CreateRoomSearchUsersQueryVariables } from "@/__generated__/graphql.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

const useSearchUsersQuery = (variables: CreateRoomSearchUsersQueryVariables) => {
  return useCustomLazyQuery(SEARCH_USERS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
};

export default useSearchUsersQuery;
