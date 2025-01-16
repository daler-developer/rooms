import { useRoomChatStore } from "@/widgets/room-chat/context";
import { useQuery } from "@apollo/client";
import { GET_ROOM } from "@/widgets/room-chat/gql/tags.ts";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";

const ParticipantsOnlineCount = () => {
  const { data: roomData } = useRoomQuery();

  return (
    <div>
      <span className="text-green-600 text-[14px]">{roomData!.room.participantsOnlineCount} online</span>
    </div>
  );
};

export default ParticipantsOnlineCount;
