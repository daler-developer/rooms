import { useSubscription } from "@apollo/client";
import { ROOM_PENDING_INVITATIONS_COUNT_CHANGE_SUB } from "./tags";
import { useRoomId } from "../context";
import { Room } from "@/__generated__/graphql.ts";

const useParticipantsOnlineCountChangeSub = () => {
  const roomId = useRoomId();

  useSubscription(ROOM_PENDING_INVITATIONS_COUNT_CHANGE_SUB, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          pendingInvitationsCount() {
            // return data.data!.roomPendingInvitationsCountChange.
          },
        },
      });
    },
  });
};

export default useParticipantsOnlineCountChangeSub;
