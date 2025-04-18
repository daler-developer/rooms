import { useSubscription } from "@apollo/client";
import { ROOM_LAST_MESSAGE_CHANGE_SUB } from "./tags.ts";
import { Room, RoomsListLastMessageChangeSubscriptionVariables } from "@/__generated__/graphql.ts";

const useRoomLastMessageChangeSub = (variables: RoomsListLastMessageChangeSubscriptionVariables) => {
  return useSubscription(ROOM_LAST_MESSAGE_CHANGE_SUB, {
    variables,
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      const lastMessage = data.data.roomLastMessageChange;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          lastMessage() {
            return lastMessage;
          },
        },
      });
    },
  });
};

export default useRoomLastMessageChangeSub;
