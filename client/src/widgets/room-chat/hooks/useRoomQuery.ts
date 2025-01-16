import { useQuery } from "@apollo/client";
import { GET_ROOM } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

const useRoomQuery = () => {
  const { roomId } = useRoomChatStore();

  const query = useQuery(GET_ROOM, {
    variables: {
      roomId,
      scheduledMessagesOffset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  const fetchMoreScheduledMessages = () => {};

  return {
    ...query,
    fetchMoreScheduledMessages,
  };
};

export default useRoomQuery;
