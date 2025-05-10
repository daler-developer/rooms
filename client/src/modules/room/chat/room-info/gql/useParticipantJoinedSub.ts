import { useSubscription } from "@apollo/client";
import { PARTICIPANT_JOINED_SUB } from "@/modules/room/chat/room-info/gql/tags.ts";
import { Room, RoomChatParticipantJoinedSubscriptionVariables } from "@/__generated__/graphql.ts";

const useParticipantJoinedSub = (variables: RoomChatParticipantJoinedSubscriptionVariables) => {
  useSubscription(PARTICIPANT_JOINED_SUB, {
    variables,
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          participants(prev = [], { toReference }) {
            return [...prev, toReference(data.data!.roomParticipantJoined)];
          },
        },
      });
    },
  });
};

export default useParticipantJoinedSub;
