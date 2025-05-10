import { useEffect } from "react";
import { ROOM_PARTICIPANT_TYPING_START } from "./tags";
import useGetRoomQuery from "./useGetRoomQuery";
import { useRoomId } from "../context";
import { useSubscription } from "@apollo/client";
import { Room } from "@/__generated__/graphql.ts";

const useRoomParticipantTypingStartSub = () => {
  const roomId = useRoomId();
  const roomQuery = useGetRoomQuery();

  useSubscription(ROOM_PARTICIPANT_TYPING_START, {
    variables: {
      roomId,
    },
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          participantsTyping(prev) {
            return [...prev, data.data!.roomParticipantTypingStart];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (roomQuery.data) {
      // const unsubscribe = roomQuery.subscribeToMore({
      //   document: ROOM_PARTICIPANT_TYPING_START,
      //   variables: {
      //     roomId,
      //   },
      //   updateQuery(prevData, { subscriptionData }) {
      //     return {
      //       ...prevData,
      //       room: {
      //         ...prevData.room,
      //         participantsTyping: [...prevData.room.participantsTyping, subscriptionData.data.roomParticipantTypingStart],
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

export default useRoomParticipantTypingStartSub;
