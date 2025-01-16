import { useQuery } from "@apollo/client";
import { GET_MY_ROOMS } from "./tags";

const useGetRoomsQuery = () => {
  return useQuery(GET_MY_ROOMS, { notifyOnNetworkStatusChange: true });
};

export default useGetRoomsQuery;
