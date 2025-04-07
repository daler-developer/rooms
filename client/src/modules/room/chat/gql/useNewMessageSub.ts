import { useEffect } from "react";
import { NEW_MESSAGE_SUB } from "./tags.ts";
import useGetMessagesQuery from "./useGetMessagesQuery.ts";
import { useRoomChatEmitter } from "../emitter.ts";

const useNewMessageSub = () => {
  const queries = {
    messages: useGetMessagesQuery(),
  };

  const emitter = useRoomChatEmitter();

  useEffect(() => {
    if (queries.messages.data) {
      const unsubscribe = queries.messages.subscribeToMore({
        document: NEW_MESSAGE_SUB,
        variables: {
          skipFromCurrentSession: true,
        },
        updateQuery(prevData, { subscriptionData }) {
          if (!subscriptionData.data) return prevData;

          emitter.emit("MESSAGE_INSERTED", {
            senderIsMe: false,
          });

          return {
            ...prevData,
            room: {
              ...prevData.room,
              messages: {
                ...prevData.room.messages,
                data: [...prevData.room.messages.data, subscriptionData.data.newMessage.message],
              },
            },
          };
        },
      });

      return () => {
        unsubscribe();
      };
    }
  }, [queries.messages]);
};

export default useNewMessageSub;
