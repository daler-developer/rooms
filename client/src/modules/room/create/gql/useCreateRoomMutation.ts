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
        id: "ROOM_QUERY",
        fields: {
          rooms(prevRooms, { toReference }) {
            if (!prevRooms) {
              console.log("return");
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
