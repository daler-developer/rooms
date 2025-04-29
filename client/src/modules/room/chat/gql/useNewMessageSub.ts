import { useSubscription } from "@apollo/client";
import { Room } from "@/__generated__/graphql.ts";
import { NEW_MESSAGE_SUB } from "./tags.ts";
import { useRoomChatEmitter } from "../emitter.ts";
import { useRoomId } from "../context";

const useNewMessageSub = () => {
  const roomId = useRoomId();

  const emitter = useRoomChatEmitter();

  return useSubscription(NEW_MESSAGE_SUB, {
    variables: {
      skipFromCurrentSession: true,
    },
    onData({ data, client }) {
      if (!data.data) return;

      const newMessage = data.data.newMessage;

      if (newMessage.roomId !== roomId) {
        return;
      }

      console.log("newMessage", newMessage);

      emitter.emit("MESSAGE_INSERTED", {
        senderIsMe: false,
      });

      client.cache.modify<Room>({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          messages(prevMessages, { toReference }) {
            return {
              ...prevMessages,
              data: [...prevMessages.data, toReference(newMessage)],
            };
          },
        },
      });
    },
  });
};

export default useNewMessageSub;
