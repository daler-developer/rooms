import { useQuery } from "@apollo/client";
import { GET_ME } from "./tags";

const useGetMeQuery = () => {
  return useQuery(GET_ME, {
    // fetchPolicy: "cache-and-network",
  });
};

export default useGetMeQuery;
