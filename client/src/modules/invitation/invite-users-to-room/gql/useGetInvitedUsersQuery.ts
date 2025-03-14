import { GET_INVITED_USERS } from "./tags";
import { useQuery } from "@apollo/client";
import { RoomInviteMembersGetInvitedUsersQueryVariables } from "@/__generated__/graphql.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

const useGetInvitedUsersQuery = (variables: RoomInviteMembersGetInvitedUsersQueryVariables) => {
  return useCustomLazyQuery(GET_INVITED_USERS, {
    variables,
  });
};
export default useGetInvitedUsersQuery;
