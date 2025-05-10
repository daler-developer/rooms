import { useQuery } from "@apollo/client";
import { GET_ROOM } from "./tags.ts";
import { useRoomId } from "../context";

const useGetRoomQuery = () => {
  const roomId = useRoomId();

  return useQuery(GET_ROOM, {
    notifyOnNetworkStatusChange: true,
    variables: {
      roomId,
    },
  });
};

export default useGetRoomQuery;
