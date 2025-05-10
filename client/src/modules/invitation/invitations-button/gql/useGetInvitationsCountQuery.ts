import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_COUNT } from "./tags";

const useGetInvitationsCountQuery = () => {
  return useQuery(GET_INVITATIONS_COUNT, {
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetInvitationsCountQuery;
