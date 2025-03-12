import { useQuery } from "@apollo/client";
import { GET_INVITATIONS_LIST } from "./tags";

const useGetInvitationsListQuery = () => {
  return useQuery(GET_INVITATIONS_LIST, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });
};

export default useGetInvitationsListQuery;
