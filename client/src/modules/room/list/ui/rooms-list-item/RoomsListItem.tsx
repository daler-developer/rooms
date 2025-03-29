import { Link } from "react-router-dom";
import { RoomsListQuery } from "@/__generated__/graphql.ts";
import { useApolloClient } from "@apollo/client";
import RoomsListItemLastMessage from "./RoomsListItemLastMessage.tsx";
import { Avatar, Badge } from "@/shared/ui";
import { useEffect } from "react";
import { emitter } from "@/global/event-emitter";
import { EventCallback } from "@/global/event-emitter/emitter.ts";
import useNewMessageSub from "../../gql/useNewMessageSub.ts";
import useRoomParticipantLeaveSub from "../../gql/useRoomParticipantLeaveSub.ts";

type Props = {
  room: Flatten<RoomsListQuery["rooms"]>;
};

const RoomsListItem = ({ room }: Props) => {
  const apolloClient = useApolloClient();

  useNewMessageSub({ room });
  useRoomParticipantLeaveSub({ roomId: room.id });

  useEffect(() => {
    const handler: EventCallback<"MESSAGES_IS_VIEWED"> = (payload) => {
      const messageIsViewedInCurrentRoom = payload.roomId === room.id;

      if (messageIsViewedInCurrentRoom) {
        apolloClient.cache.modify({
          id: apolloClient.cache.identify(room),
          fields: {
            unreadMessagesCount(prev: number) {
              return prev - 1;
            },
          },
        });
      }
    };

    emitter.on("MESSAGES_IS_VIEWED", handler);

    return () => {
      emitter.off("MESSAGES_IS_VIEWED", handler);
    };
  }, [room, apolloClient]);

  return (
    <Link to={`/home?roomId=${room.id}`} className="w-full flex items-center gap-2 border-gray-200 p-1 cursor-pointer [&:not(:last-child)]:border-b-[0.5px]">
      <div className="shrink-0">
        <Avatar alt={room.name} size="md" src={room.thumbnailUrl} />
      </div>
      <div className="flex-grow overflow-hidden flex flex-col justify-between text-[14px]">
        <div className="text-[16px] font-black whitespace-nowrap overflow-hidden overflow-ellipsis">{room.name}</div>
        {room.lastMessage ? <RoomsListItemLastMessage message={room.lastMessage} /> : <div className="font-medium text-[13px] text-gray-500">No messages</div>}
      </div>
      <div className="shrink-0 pr-1">
        <Badge badgeColor="blue" badgeContent={room.unreadMessagesCount} />
      </div>
    </Link>
  );
};

export default RoomsListItem;
