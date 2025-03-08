import { useQuery } from "@apollo/client";
import { GET_ME } from "./tags";

const useGetMeQuery = () => {
  return useQuery(GET_ME);
};

export default useGetMeQuery;
