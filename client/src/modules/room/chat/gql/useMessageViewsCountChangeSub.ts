import { useSubscription } from "@apollo/client";
import { Message, RoomChatMessageViewsCountChangeSubscriptionVariables } from "@/__generated__/graphql.ts";
import { MESSAGE_VIEWS_COUNT_CHANGE_SUB } from "./tags.ts";

const useMessageViewsCountChangeSub = (variables: RoomChatMessageViewsCountChangeSubscriptionVariables) => {
  useSubscription(MESSAGE_VIEWS_COUNT_CHANGE_SUB, {
    variables,
    onData({ data, client }) {
      if (!data.data) return;

      client.cache.modify<Message>({
        id: client.cache.identify({ __typename: "Message", id: variables.messageId }),
        fields: {
          viewsCount() {
            return data.data!.messageViewsCountChange;
          },
        },
      });
    },
  });
};

export default useMessageViewsCountChangeSub;
