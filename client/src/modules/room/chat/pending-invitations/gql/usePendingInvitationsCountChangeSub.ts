import { useSubscription } from "@apollo/client";
import { ROOM_PENDING_INVITATIONS_COUNT_CHANGE } from "./tags";
import { useRoomId } from "../../context";

const usePendingInvitationsCountChangeSub = () => {
  const roomId = useRoomId();

  return useSubscription(ROOM_PENDING_INVITATIONS_COUNT_CHANGE, {
    variables: {
      roomId,
    },
  });
};

export default usePendingInvitationsCountChangeSub;
