import { useEffect } from "react";
import { ROOM_PARTICIPANT_TYPING_STOP } from "./tags";
import useGetRoomQuery from "./useGetRoomQuery";
import { useRoomId } from "../context";

const useRoomParticipantTypingStopSub = () => {
  const roomId = useRoomId();
  const roomQuery = useGetRoomQuery();

  useEffect(() => {
    if (roomQuery.data) {
      const unsubscribe = roomQuery.subscribeToMore({
        document: ROOM_PARTICIPANT_TYPING_STOP,
        variables: {
          roomId,
        },
        updateQuery(prevData, { subscriptionData }) {
          return {
            ...prevData,
            room: {
              ...prevData.room,
              participantsTyping: prevData.room.participantsTyping.filter(
                (participant) => participant.id !== subscriptionData.data.roomParticipantTypingStop.id,
              ),
            },
          };
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [roomId, roomQuery.data]);
};

export default useRoomParticipantTypingStopSub;
