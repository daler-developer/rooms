import { useSubscription } from "@apollo/client";
import { Room } from "@/__generated__/graphql.ts";
import { ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE_SUB } from "./tags.ts";
import { useRoomId } from "../context";

const useMessageViewsCountChangeSub = () => {
  const roomId = useRoomId();

  useSubscription(ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE_SUB, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          scheduledMessagesCount() {
            return data.data!.roomScheduledMessagesCountChange;
          },
        },
      });
    },
  });
};

export default useMessageViewsCountChangeSub;
