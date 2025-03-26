import { useQuery, useSubscription } from "@apollo/client";
import { GET_ME, USER_TYPING_STATUS_CHANGED_SUB } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { InviteUsersToRoomModal, type RoomInviteMembersModalHandler } from "@/modules/invitation/invite-users-to-room";
import { useRef } from "react";
import { Avatar, IconButton } from "@/shared/ui";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import PendingInvitationsCount from "../../../pending-invitations/ui/PendingInvitationsCount.tsx";
import RoomInfoModal, { type RoomInfoModalHandler } from "../../../room-info/RoomInfoModal.tsx";
import ParticipantsOnlineCount from "./ParticipantsOnlineCount.tsx";
import SelectedMessagesController from "./SelectedMessagesController.tsx";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import ParticipantsTypingList from "./ParticipantsTypingList.tsx";
import BaseScreenHeader from "../../base/BaseScreenHeader.tsx";
import MainActions from "../../../main-actions/ui/MainActions.tsx";

const ScreenMainHeader = () => {
  const { roomId, selectedMessages } = useRoomChatStore();

  const roomInfoModalComp = useRef<RoomInfoModalHandler>(null!);

  const { data: meData } = useQuery(GET_ME);

  useSubscription(USER_TYPING_STATUS_CHANGED_SUB, {
    variables: {
      roomId,
    },
    onData({ data, client }) {
      client.cache.modify({
        id: client.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          participantsTyping(existingItems = [], { readField }) {
            if (data.data!.userTypingStatusChange.isTyping) {
              if (existingItems.find((i) => i.id === data.data!.userTypingStatusChange.user.id)) {
                return existingItems;
              } else {
                return [...existingItems, data.data!.userTypingStatusChange.user];
              }
            } else {
              return existingItems.filter((item) => readField("id", item) !== data.data!.userTypingStatusChange.user.id);
            }
          },
        },
      });
    },
  });

  const { data: roomData } = useRoomQuery();

  const openRoomInfoModal = () => {
    roomInfoModalComp.current.open();
  };

  const participantsTypingExceptMe = roomData!.room.participantsTyping.filter((partcipant) => partcipant.id !== meData!.me.id);

  if (selectedMessages.length > 0) {
    return <SelectedMessagesController />;
  }

  return (
    <>
      <BaseScreenHeader
        left={
          <div className="flex items-center gap-2">
            <Avatar onClick={() => openRoomInfoModal()} className="cursor-pointer" size="md" src={roomData!.room.thumbnailUrl} />
            <div className="flex flex-col justify-between">
              <div className="text-[16px] font-medium whitespace-nowrap hover:underline cursor-pointer" onClick={() => openRoomInfoModal()}>
                {roomData!.room.name}
              </div>
              {participantsTypingExceptMe.length > 0 ? <ParticipantsTypingList users={[...participantsTypingExceptMe]} /> : <ParticipantsOnlineCount />}
            </div>
          </div>
        }
        right={
          <div className="flex items-center gap-4">
            <PendingInvitationsCount />
            <MainActions />
          </div>
        }
      />

      <RoomInfoModal ref={roomInfoModalComp} />
    </>
  );
};

export default ScreenMainHeader;
