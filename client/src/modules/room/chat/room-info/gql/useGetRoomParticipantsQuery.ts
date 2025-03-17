import { useQuery } from "@apollo/client";
import { GET_ROOM_PARTICIPANTS_QUERY, PARTICIPANT_JOINED } from "./tags";
import { RoomChatGetRoomParticipantsQueryVariables } from "@/__generated__/graphql";
import { useEffect } from "react";

const useGetRoomParticipantsQuery = (variables: RoomChatGetRoomParticipantsQueryVariables) => {
  const query = useQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables,
  });

  useEffect(() => {
    if (query.data) {
      const unsubscribe = query.subscribeToMore({
        document: PARTICIPANT_JOINED,
        variables: {
          roomId: variables.id,
        },
        updateQuery(prev, { subscriptionData }) {
          const newParticipant = subscriptionData.data.roomParticipantJoined;
          return {
            ...prev,
            room: {
              ...prev.room,
              participants: [...prev.room.participants, newParticipant],
            },
          };
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [query.data]);

  return query;
};

export default useGetRoomParticipantsQuery;
