import { useSubscription } from "@apollo/client";
import { ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE_SUB } from "./tags";
import { useRoomId } from "../context";
import { Room } from "@/__generated__/graphql.ts";

const useParticipantsOnlineCountChangeSub = () => {
  const roomId = useRoomId();

  useSubscription(ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE_SUB, {
    variables: {
      roomId,
    },
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          participantsOnlineCount() {
            return data.data!.roomParticipantsOnlineCountChange;
          },
        },
      });
    },
  });
};

export default useParticipantsOnlineCountChangeSub;
