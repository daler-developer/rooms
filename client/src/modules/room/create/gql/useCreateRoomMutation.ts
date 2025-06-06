import { type Query } from "@/__generated__/graphql";
import { CREATE_ROOM } from ".";
import { useCustomMutation } from "@/shared/lib/graphql";

const useCreateRoomMutation = () => {
  return useCustomMutation(CREATE_ROOM, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const newRoom = data.createRoom;
      cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms, { toReference, readField }) {
            if (!prevRooms) {
              return [toReference(newRoom)];
            }

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

export default useCreateRoomMutation;
