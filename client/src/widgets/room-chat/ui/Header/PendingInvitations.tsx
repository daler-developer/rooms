import { useQuery, useSubscription } from "@apollo/client";
import { GET_ROOM, ROOM_PENDING_INVITATIONS_COUNT_CHANGE } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";

const PendingInvitations = () => {
  const { roomId } = useRoomChatStore();

  const { data } = useRoomQuery();

  useSubscription(ROOM_PENDING_INVITATIONS_COUNT_CHANGE, {
    variables: {
      roomId,
    },
  });

  return <div className="text-sm">Pending invitations: {data!.room.pendingInvitationsCount}</div>;
};

export default PendingInvitations;
