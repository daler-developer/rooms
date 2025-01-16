import { useQuery } from "@apollo/client";
import { GET_ROOM } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

const useRoomQuery = () => {
  const { roomId, messagesOffset, scheduledMessagesOffset } = useRoomChatStore();

  const query = useQuery(GET_ROOM, {
    variables: {
      roomId,
      messagesOffset,
      scheduledMessagesOffset,
    },
  });

  const fetchMoreMessages = async () => {
    await query.fetchMore({
      variables: {
        messagesOffset: query.data!.room.messages.data.length,
      },
    });
  };

  const fetchMoreScheduledMessages = () => {};

  return {
    ...query,
    fetchMoreMessages,
    fetchMoreScheduledMessages,
  };
};

export default useRoomQuery;
