import { useQuery } from "@apollo/client";
import { GET_SCHEDULED_MESSAGES } from "./tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

const useGetScheduledMessagesQuery = () => {
  const { roomId } = useRoomChatStore();

  return useQuery(GET_SCHEDULED_MESSAGES, {
    variables: {
      roomId,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetScheduledMessagesQuery;
