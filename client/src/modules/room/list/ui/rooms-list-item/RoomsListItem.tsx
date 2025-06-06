import cn from "@/shared/lib/classnames";
import { RoomsListQuery } from "@/__generated__/graphql.ts";
import RoomsListItemLastMessage from "./RoomsListItemLastMessage.tsx";
import { Avatar, Badge } from "@/shared/ui";
import useRoomLastMessageChangeSub from "../../gql/useRoomLastMessageChangeSub.ts";
import useRoomParticipantLeaveSub from "../../gql/useRoomParticipantLeaveSub.ts";
import useRoomNewMessagesCountChangeSub from "../../gql/useRoomNewMessagesCountChangeSub.ts";

type Props = {
  room: Flatten<RoomsListQuery["rooms"]>;
  isSelected: boolean;
  onClick: () => void;
};

const RoomsListItem = ({ room, isSelected, onClick }: Props) => {
  useRoomLastMessageChangeSub({ roomId: room.id });
  useRoomParticipantLeaveSub({ roomId: room.id });
  useRoomNewMessagesCountChangeSub({ roomId: room.id });

  return (
    <div
      className={cn("w-full flex items-center gap-2 border-gray-200 p-1 cursor-pointer [&:not(:last-child)]:border-b-[0.5px]", {
        "bg-blue-50": isSelected,
      })}
      onClick={onClick}
    >
      <div className="shrink-0">
        <Avatar alt={room.name} size="md" src={room.thumbnailUrl} />
      </div>
      <div className="flex-grow overflow-hidden flex flex-col justify-between text-[14px]">
        <div className="text-[16px] font-black whitespace-nowrap overflow-hidden overflow-ellipsis">{room.name}</div>
        {room.lastMessage ? <RoomsListItemLastMessage message={room.lastMessage} /> : <div className="font-medium text-[13px] text-gray-500">No messages</div>}
      </div>
      <div className="shrink-0 pr-1">
        <Badge badgeColor="blue" badgeContent={room.newMessagesCount} />
      </div>
    </div>
  );
};

export default RoomsListItem;
