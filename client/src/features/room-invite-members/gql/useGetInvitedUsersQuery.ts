import { useCustomMutation } from "@/shared/lib/graphql";
import { GET_INVITED_USERS } from "./tags";

const useGetInvitedUsersQuery = () => {
  return useCustomMutation(GET_INVITED_USERS);
};

export default useGetInvitedUsersQuery;
