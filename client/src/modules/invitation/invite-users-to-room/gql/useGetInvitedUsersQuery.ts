import { GET_INVITED_USERS } from "./tags";
import { useQuery } from "@apollo/client";
import { RoomInviteMembersGetInvitedUsersQueryVariables } from "@/__generated__/graphql.ts";

const useGetInvitedUsersQuery = (variables: RoomInviteMembersGetInvitedUsersQueryVariables) => {
  return useQuery(GET_INVITED_USERS, {
    variables,
  });
};

export default useGetInvitedUsersQuery;
