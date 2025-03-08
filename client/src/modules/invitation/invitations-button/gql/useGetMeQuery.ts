import { useQuery } from "@apollo/client";
import { GET_ME } from "./tags";

const useGetMeQuery = () => {
  return useQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetMeQuery;
