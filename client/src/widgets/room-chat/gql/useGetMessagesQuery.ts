import { useQuery } from "@apollo/client";
import { GET_MESSAGES } from "./tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

const useGetMessagesQuery = () => {
  const { roomId, messagesOffset } = useRoomChatStore();

  return useQuery(GET_MESSAGES, {
    variables: {
      roomId,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });
};

export default useGetMessagesQuery;
