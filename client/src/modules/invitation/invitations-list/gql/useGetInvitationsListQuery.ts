import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_LIST } from "./tags";

const useGetInvitationsListQuery = () => {
  return useQuery(GET_INVITATIONS_LIST, {
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetInvitationsListQuery;
