import { SEARCH_USERS } from "./index";
import { SearchUsersQueryVariables } from "@/__generated__/graphql.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

const useSearchUsersQuery = (variables: SearchUsersQueryVariables) => {
  return useCustomLazyQuery(SEARCH_USERS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
};

export default useSearchUsersQuery;
