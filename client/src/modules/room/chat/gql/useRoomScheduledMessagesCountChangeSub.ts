import { useSubscription } from "@apollo/client";
import { Room, RoomChatScheduledMessagesCountChangeSubscriptionVariables } from "@/__generated__/graphql.ts";
import { ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE_SUB } from "./tags.ts";

const useMessageViewsCountChangeSub = (variables: RoomChatScheduledMessagesCountChangeSubscriptionVariables) => {
  useSubscription(ROOM_SCHEDULED_MESSAGES_COUNT_CHANGE_SUB, {
    variables,
    onData({ data, client }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          myScheduledMessagesCount() {
            return data.data!.roomScheduledMessagesCountChange;
          },
        },
      });
    },
  });
};

export default useMessageViewsCountChangeSub;
