import { useQuery } from "@apollo/client";
import { ROOMS_LIST } from "./tags";

const useGetRoomsQuery = () => {
  return useQuery(ROOMS_LIST, { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-and-network" });
};

export default useGetRoomsQuery;
