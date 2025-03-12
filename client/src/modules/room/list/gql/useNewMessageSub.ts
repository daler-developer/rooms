import { useSubscription } from "@apollo/client";
import { NEW_MESSAGE_SUB } from "./tags.ts";
import { RoomsListQuery, Room } from "@/__generated__/graphql.ts";

const useNewMessageSub = ({ room }: { room: Flatten<RoomsListQuery["rooms"]> }) => {
  return useSubscription(NEW_MESSAGE_SUB, {
    variables: {
      skipFromCurrentSession: true,
    },
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      const newMessage = data.data.newMessage.message;

      if (room.id === newMessage.roomId) {
        client.cache.modify<Room>({
          id: client.cache.identify(room),
          fields: {
            lastMessage() {
              return newMessage;
            },
          },
        });
      }
    },
  });
};

export default useNewMessageSub;
