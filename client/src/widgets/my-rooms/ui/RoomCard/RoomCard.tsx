import { useSubscription } from "@apollo/client";
import { ROOM_PARTICIPANT_LEFT_SUBSCRIPTION, ROOM_PARTICIPANT_JOINED_SUBSCRIPTION, NEW_MESSAGE_SUB } from "../../gql/tags.ts";
import { Link } from "react-router-dom";
import { GetMyRoomsQuery } from "@/__generated__/graphql.ts";
import { useApolloClient } from "@apollo/client";
import RoomCardLastMessage from "@/widgets/my-rooms/ui/RoomCard/RoomCardLastMessage.tsx";
import { Avatar, Badge } from "@/shared/ui";
import { useEffect } from "react";
import { emitter } from "@/global/event-emitter";
import { EventCallback } from "@/global/event-emitter/emitter.ts";

type Props = {
  room: Flatten<GetMyRoomsQuery["me"]["rooms"]>;
};

const RoomCard = ({ room }: Props) => {
  const apolloClient = useApolloClient();

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

  useSubscription(ROOM_PARTICIPANT_LEFT_SUBSCRIPTION, {
    onData({ data, client }) {
      client.cache.modify({
        id: client.cache.identify(room),
        fields: {
          participants(oldParticipants, { readField }) {
            return oldParticipants.filter((participant) => readField("id", participant) !== data.data!.roomParticipantLeft.id);
          },
          participantsCount(oldCount) {
            return oldCount - 1;
          },
        },
      });
    },
    variables: {
      roomId: room.id,
    },
  });

  useSubscription(ROOM_PARTICIPANT_JOINED_SUBSCRIPTION, {
    onData({ data, client }) {
      client.cache.modify({
        id: client.cache.identify(room),
        fields: {
          participants(oldParticipants) {
            return [...oldParticipants, data.data!.roomParticipantJoined];
          },
          participantsCount(oldCount) {
            return oldCount + 1;
          },
        },
      });
    },
    variables: {
      roomId: room.id,
    },
  });

  // useSubscription(NEW_MESSAGE_SUB, {
  //   onData({ data, client }) {
  //     console.log("test");
  //     const newMessage = data.data!.newMessage.message;
  //
  //     const isSentInThisRoom = newMessage.room.id === room.id;
  //
  //     if (isSentInThisRoom) {
  //       client.cache.modify({
  //         id: client.cache.identify(room),
  //         fields: {
  //           lastMessage() {
  //             return newMessage;
  //           },
  //         },
  //       });
  //     }
  //   },
  // });

  return (
    <Link to={`/home?roomId=${room.id}`} className="flex items-center gap-2 border-b border-gray-300 shadow-sm p-1 cursor-pointer">
      <Avatar size="md" src={room.thumbnailUrl} />
      <div className="flex-grow flex flex-col justify-between text-[14px]">
        <div className="text-[16px" style={{ fontWeight: "900" }}>
          {room.name}
        </div>
        {room.lastMessage ? <RoomCardLastMessage message={room.lastMessage} /> : <div className="font-medium text-[13px] text-gray-500">No messages</div>}
      </div>
      <div className="pr-2">
        <Badge badgeColor="blue" badgeContent={room.unreadMessagesCount} />
      </div>
    </Link>
  );
};

export default RoomCard;
