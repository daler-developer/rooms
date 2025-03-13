import { useQuery, useSubscription } from "@apollo/client";
import { GET_ME, USER_TYPING_STATUS_CHANGED_SUB } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { RoomInviteMembersModal, type RoomInviteMembersModalHandler } from "@/modules/invitation/invite-users-to-room";
import { useRef } from "react";
import { Avatar, IconButton } from "@/shared/ui";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import PendingInvitations from "./PendingInvitations";
import RoomInfoModal, { type RoomInfoModalHandler } from "@/widgets/room-chat/ui/RoomInfo/RoomInfoModal.tsx";
import ParticipantsOnlineCount from "./ParticipantsOnlineCount.tsx";
import SelectedMessagesController from "./SelectedMessagesController.tsx";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import ParticipantsTypingList from "./ParticipantsTypingList.tsx";
import BaseScreenHeader from "../../base/BaseScreenHeader.tsx";

const ScreenMainHeader = () => {
  const { roomId, selectedMessages } = useRoomChatStore();

  const roomInviteMembersModalComp = useRef<RoomInviteMembersModalHandler>(null!);
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

  const handleInvite = async () => {
    await roomInviteMembersModalComp.current.open({
      roomId,
    });
  };

  const openRoomInfoModal = () => {
    roomInfoModalComp.current.open();
  };

  const handleLeave = () => {};

  const participantsTypingExceptMe = roomData!.room.participantsTyping.filter((partcipant) => partcipant.id !== meData!.me.id);

  if (selectedMessages.length > 0) {
    return <SelectedMessagesController />;
  }

  return (
    <>
      <BaseScreenHeader
        left={
          <div className="flex items-center gap-2">
            <Avatar size="md" src={roomData!.room.thumbnailUrl} />
            <div className="flex flex-col justify-between">
              <div onClick={() => openRoomInfoModal()}>{roomData!.room.name}</div>
              {participantsTypingExceptMe.length > 0 ? <ParticipantsTypingList users={[...participantsTypingExceptMe]} /> : <ParticipantsOnlineCount />}
            </div>
          </div>
        }
        right={
          <div className="flex items-center gap-4">
            <PendingInvitations />
            <Dropdown
              placement="bottom-right"
              trigger={
                <div>
                  <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
                </div>
              }
              items={[
                {
                  label: "Invite",
                  onClick: handleInvite,
                },
                {
                  label: "Leave",
                  onClick: handleLeave,
                },
              ]}
            />
          </div>
        }
      />

      <RoomInviteMembersModal ref={roomInviteMembersModalComp} />
      <RoomInfoModal ref={roomInfoModalComp} />
    </>
  );
};

export default ScreenMainHeader;
