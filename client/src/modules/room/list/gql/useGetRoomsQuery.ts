import { useQuery } from "@apollo/client";
import { ROOMS_LIST } from "./tags";

const useGetRoomsQuery = () => {
  return useQuery(ROOMS_LIST, { notifyOnNetworkStatusChange: true });
};

export default useGetRoomsQuery;
