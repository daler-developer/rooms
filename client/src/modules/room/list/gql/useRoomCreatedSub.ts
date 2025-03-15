import { useSubscription } from "@apollo/client";
import { ROOM_CREATED_SUB } from "./tags.ts";
import { Query } from "@/__generated__/graphql.ts";

const useRoomCreatedSub = () => {
  return useSubscription(ROOM_CREATED_SUB, {
    variables: {
      skipFromCurrentSession: true,
    },
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      const newRoom = data.data.roomCreated;

      client.cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms, { toReference }) {
            if (!prevRooms) return;

            return [...prevRooms, toReference(newRoom)];
          },
        },
      });
    },
  });
};

export default useRoomCreatedSub;
