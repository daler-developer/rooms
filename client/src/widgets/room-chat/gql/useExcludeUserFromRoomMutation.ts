import { EXCLUDE_USER_FROM_ROOM } from "./tags";
import { RoomChatExcludeFromMutationVariables, Room } from "@/__generated__/graphql";
import { useCustomMutation } from "@/shared/lib/graphql";

const useExcludeUserFromRoomMutation = (variables: RoomChatExcludeFromMutationVariables) => {
  return useCustomMutation(EXCLUDE_USER_FROM_ROOM, {
    update(cache) {
      cache.modify<Room>({
        id: cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          participants(prevParticipants, { readField }) {
            if (!prevParticipants) {
              return;
            }
            return prevParticipants.filter((participant) => {
              const participantId = readField<number>("id", participant);
              return participantId !== variables.userId;
            });
          },
        },
      });
    },
    variables,
  });
};

export default useExcludeUserFromRoomMutation;
