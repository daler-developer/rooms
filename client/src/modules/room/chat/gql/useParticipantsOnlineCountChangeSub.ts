import { useSubscription } from "@apollo/client";
import { ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE_SUB } from "./tags";
import { useRoomId } from "../context";

const useParticipantsOnlineCountChangeSub = () => {
  const roomId = useRoomId();

  useSubscription(ROOM_PARTICIPANTS_ONLINE_COUNT_CHANGE_SUB, {
    variables: {
      roomId,
    },
  });
};

export default useParticipantsOnlineCountChangeSub;
