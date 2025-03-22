import { useQuery } from "@apollo/client";
import { ROOMS_LIST } from "./tags";

const useGetRoomsQuery = () => {
  const query = useQuery(ROOMS_LIST, { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-and-network" });

  return query;
};

export default useGetRoomsQuery;
