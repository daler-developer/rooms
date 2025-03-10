import { GET_ME } from "./tags";
import { useCustomLazyQuery } from "@/shared/lib/graphql";

const useGetMeQuery = () => {
  return useCustomLazyQuery(GET_ME, {
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetMeQuery;
