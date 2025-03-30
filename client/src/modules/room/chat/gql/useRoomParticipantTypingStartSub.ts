import { useEffect } from "react";
import { ROOM_PARTICIPANT_TYPING_START } from "./tags";
import useGetRoomQuery from "./useGetRoomQuery";
import { useRoomId } from "../context";

const useRoomParticipantTypingStartSub = () => {
  const roomId = useRoomId();
  const roomQuery = useGetRoomQuery();

  useEffect(() => {
    if (roomQuery.data) {
      const unsubscribe = roomQuery.subscribeToMore({
        document: ROOM_PARTICIPANT_TYPING_START,
        variables: {
          roomId,
        },
        updateQuery(prevData, { subscriptionData }) {
          return {
            ...prevData,
            room: {
              ...prevData.room,
              participantsTyping: [...prevData.room.participantsTyping, subscriptionData.data.roomParticipantTypingStart],
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

export default useRoomParticipantTypingStartSub;
