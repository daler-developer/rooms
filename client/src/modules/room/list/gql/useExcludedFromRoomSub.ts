import { useSubscription } from "@apollo/client";
import { Query } from "@/__generated__/graphql";
import { ME_IS_EXCLUDED_FROM_ROOM } from "./tags";
import { useToast } from "@/shared/ui";

const useExcludedFromRoomSub = () => {
  const toast = useToast();

  return useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data, client }) {
      if (!data.data) {
        return;
      }
      client.cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms, { readField }) {
            if (!prevRooms) {
              return;
            }
            return prevRooms.filter((room) => {
              const roomId = readField<number>("id", room);

              return roomId !== data.data!.meIsExcludedFromRoom.id;
            });
          },
        },
      });
      toast.warning(`You were excluded from room: "${data.data.meIsExcludedFromRoom.name}"`);
    },
  });
};

export default useExcludedFromRoomSub;
