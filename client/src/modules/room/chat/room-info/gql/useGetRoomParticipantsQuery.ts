import { useQuery } from "@apollo/client";
import { GET_ROOM_PARTICIPANTS_QUERY, PARTICIPANT_JOINED_SUB, PARTICIPANT_LEFT_SUB } from "./tags";
import { RoomChatGetRoomParticipantsQueryVariables, RoomChatGetRoomParticipantsQuery } from "@/__generated__/graphql";
import { useEffect } from "react";

const useGetRoomParticipantsQuery = (variables: RoomChatGetRoomParticipantsQueryVariables) => {
  const query = useQuery(GET_ROOM_PARTICIPANTS_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables,
  });

  useEffect(() => {
    if (query.data) {
      const unsubscribeParticipantJoined = query.subscribeToMore({
        document: PARTICIPANT_JOINED_SUB,
        variables: {
          roomId: variables.id,
        },
        updateQuery(prev, { subscriptionData }): RoomChatGetRoomParticipantsQuery {
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

      const unsubscribeParticipantLeft = query.subscribeToMore({
        document: PARTICIPANT_LEFT_SUB,
        variables: {
          roomId: variables.id,
        },
        updateQuery(prev, { subscriptionData }): RoomChatGetRoomParticipantsQuery {
          const participant = subscriptionData.data.roomParticipantLeft;
          return {
            ...prev,
            room: {
              ...prev.room,
              participants: prev.room.participants.filter((_participant) => _participant.id !== participant.id),
            },
          };
        },
      });

      return () => {
        unsubscribeParticipantJoined();
        unsubscribeParticipantLeft();
      };
    }
  }, [query.data]);

  return query;
};

export default useGetRoomParticipantsQuery;
