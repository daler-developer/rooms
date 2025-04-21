import { Room } from "@/__generated__/graphql.ts";
import { useSubscription } from "@apollo/client";
import { SCHEDULED_MESSAGES_DELETED } from "./tags.ts";
import { useRoomId } from "../context";

const useScheduledMessagesDeletedSub = () => {
  const roomId = useRoomId();

  useSubscription(SCHEDULED_MESSAGES_DELETED, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      console.log("data", data.data);
      if (!data.data) return;

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          scheduledMessages(prevMessages, { readField }) {
            return {
              ...prevMessages,
              data: prevMessages.data.filter((message) => {
                const messageId = readField("id", message);

                return !data.data!.scheduledMessagesDeleted.includes(messageId);
              }),
            };
          },
        },
      });
    },
  });
};

export default useScheduledMessagesDeletedSub;
