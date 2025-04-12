import { Room } from "@/__generated__/graphql.ts";
import { useSubscription } from "@apollo/client";
import { MESSAGES_DELETED } from "./tags.ts";
import { useRoomId } from "../context";

const useMessagesDeletedSub = () => {
  const roomId = useRoomId();

  useSubscription(MESSAGES_DELETED, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          messages(prevMessages, { readField }) {
            return {
              ...prevMessages,
              data: prevMessages.data.filter((message) => {
                const messageId = readField("id", message);

                return !data.data!.messagesDeleted.messageIds.includes(messageId);
              }),
            };
          },
        },
      });
    },
  });
};

export default useMessagesDeletedSub;
