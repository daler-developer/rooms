import { useSubscription } from "@apollo/client";
import { Query, RoomsListParticipantLeaveSubscriptionVariables } from "@/__generated__/graphql";
import { ROOM_PARTICIPANT_LEAVE_SUB } from "./tags";
import { useAuth } from "@/modules/auth";

const useRoomParticipantLeaveSub = (variables: RoomsListParticipantLeaveSubscriptionVariables) => {
  const { userId } = useAuth();

  return useSubscription(ROOM_PARTICIPANT_LEAVE_SUB, {
    variables,
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      const isMe = data.data.roomParticipantLeave.id === userId;
      if (isMe) {
        client.cache.modify<Query>({
          id: "ROOT_QUERY",
          fields: {
            rooms(prevRooms, { readField }) {
              if (!prevRooms) {
                return;
              }
              return prevRooms.filter((room) => {
                const roomId = readField("id", room);
                return roomId !== variables.roomId;
              });
            },
          },
        });
      }
    },
  });
};

export default useRoomParticipantLeaveSub;
