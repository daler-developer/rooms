import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "./tags.ts";
import { useRoomId } from "../context";

const useGetMessagesQuery = () => {
  const roomId = useRoomId();

  return useQuery(GET_MESSAGES, {
    variables: {
      roomId,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: "cache-and-network",
  });
};

export default useGetMessagesQuery;
