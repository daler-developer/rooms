import { useSubscription } from "@apollo/client";
import { NEW_ROOM_SUB } from "./tags.ts";
import { Query } from "@/__generated__/graphql.ts";

const useNewRoomSub = () => {
  return useSubscription(NEW_ROOM_SUB, {
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      const newRoom = data.data.newRoom;

      client.cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms, { toReference, readField }) {
            if (!prevRooms) return;

            const exists = Boolean(
              prevRooms.find((room) => {
                return newRoom.id === readField("id", room);
              }),
            );

            if (exists) {
              return prevRooms;
            }

            return [...prevRooms, toReference(newRoom)];
          },
        },
      });
    },
  });
};

export default useNewRoomSub;
