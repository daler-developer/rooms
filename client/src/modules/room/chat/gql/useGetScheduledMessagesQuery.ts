import { useQuery } from "@apollo/client";
import { GET_SCHEDULED_MESSAGES } from "./tags.ts";
import { useRoomId } from "../context";

const useGetScheduledMessagesQuery = () => {
  const roomId = useRoomId();

  return useQuery(GET_SCHEDULED_MESSAGES, {
    variables: {
      roomId,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: "cache-and-network",
  });
};

export default useGetScheduledMessagesQuery;
