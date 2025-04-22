import { useSubscription } from "@apollo/client";
import { NEW_MESSAGES_COUNT_CHANGE_SUB } from "./tags.ts";
import { Room, RoomsListNewMessagesCountChangeSubscriptionVariables } from "@/__generated__/graphql.ts";

const useRoomNewMessagesCountChangeSub = (variables: RoomsListNewMessagesCountChangeSubscriptionVariables) => {
  return useSubscription(NEW_MESSAGES_COUNT_CHANGE_SUB, {
    variables,
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          newMessagesCount() {
            return data.data!.roomNewMessagesCountChange;
          },
        },
      });
    },
  });
};

export default useRoomNewMessagesCountChangeSub;
