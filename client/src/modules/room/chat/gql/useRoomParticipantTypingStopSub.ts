import { useEffect } from "react";
import { ROOM_PARTICIPANT_TYPING_STOP } from "./tags";
import useGetRoomQuery from "./useGetRoomQuery";
import { useRoomId } from "../context";
import { useSubscription } from "@apollo/client";
import { Room } from "@/__generated__/graphql.ts";

const useRoomParticipantTypingStopSub = () => {
  const roomId = useRoomId();
  const roomQuery = useGetRoomQuery();

  useSubscription(ROOM_PARTICIPANT_TYPING_STOP, {
    variables: {
      roomId,
    },
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          participantsTyping(prev = [], { readField }) {
            return prev.filter((participant) => {
              const id = readField("id", participant);

              return id !== data.data!.roomParticipantTypingStop.id;
            });
          },
        },
      });
    },
  });

  useEffect(() => {
    if (roomQuery.data) {
      // const unsubscribe = roomQuery.subscribeToMore({
      //   document: ROOM_PARTICIPANT_TYPING_STOP,
      //   variables: {
      //     roomId,
      //   },
      //   updateQuery(prevData, { subscriptionData }) {
      //     return {
      //       ...prevData,
      //       room: {
      //         ...prevData.room,
      //         participantsTyping: prevData.room.participantsTyping.filter(
      //           (participant) => participant.id !== subscriptionData.data.roomParticipantTypingStop.id,
      //         ),
      //       },
      //     };
      //   },
      // });
      //
      // return () => {
      //   unsubscribe();
      // };
    }
  }, [roomId, roomQuery.data]);
};

export default useRoomParticipantTypingStopSub;
