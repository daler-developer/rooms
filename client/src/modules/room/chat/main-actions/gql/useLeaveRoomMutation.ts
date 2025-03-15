import { LEAVE_ROOM } from "./tags.ts";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Query } from "@/__generated__/graphql.ts";
import { useRoomId } from "../../context";

const useLeaveRoomMutation = () => {
  const roomId = useRoomId();

  return useCustomMutation(LEAVE_ROOM, {
    optimisticResponse: {
      leaveRoom: true,
    },
    update(cache, { data }) {
      if (!data) {
        return;
      }
      cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          rooms(prevRooms, { readField }) {
            if (!prevRooms) {
              return;
            }
            return prevRooms.filter((room) => {
              const _roomId = readField("id", room);
              return _roomId !== roomId;
            });
          },
        },
      });
    },
  });
};

export default useLeaveRoomMutation;
