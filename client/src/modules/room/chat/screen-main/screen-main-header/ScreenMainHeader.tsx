import { Avatar, Button } from "@/shared/ui";
import useGetRoomQuery from "../../gql/useGetRoomQuery.ts";
import { useRoomChatStore } from "../../store";
import { useRef } from "react";
import PendingInvitations from "./PendingInvitations.tsx";
import RoomInfoModal, { type RoomInfoModalHandler } from "../../room-info/RoomInfoModal.tsx";
import ParticipantsOnlineCount from "./ParticipantsOnlineCount.tsx";
import ParticipantsTypingList from "./ParticipantsTypingList.tsx";
import MainActions from "../../main-actions/ui/MainActions.tsx";
import BaseScreen from "../../base/BaseScreen.tsx";
import useDeleteMessagesMutation from "../../gql/useDeleteMessagesMutation.ts";
import { useAuth } from "@/modules/auth";

const ScreenMainHeader = () => {
  const { roomId, selectedMessages, clearSelectedMessages } = useRoomChatStore();

  const roomInfoModalComp = useRef<RoomInfoModalHandler>(null!);

  const { userId } = useAuth();

  const queries = {
    room: useGetRoomQuery(),
  };

  const mutations = {
    deleteMessages: useDeleteMessagesMutation(),
  };

  const handleDelete = async () => {
    mutations.deleteMessages.mutate({
      variables: {
        roomId,
        messageIds: selectedMessages,
      },
    });
    clearSelectedMessages();
  };

  const handleCancel = () => {
    clearSelectedMessages();
  };

  const openRoomInfoModal = () => {
    roomInfoModalComp.current.open();
  };

  const participantsTypingExceptMe = queries.room.data!.room.participantsTyping.filter((participant) => participant.id !== userId);

  if (selectedMessages.length > 0) {
    return (
      <BaseScreen.Header
        left={
          <div className="flex items-center gap-2">
            <h1 className="text-[18px] font-medium text-gray-900">Selected: {selectedMessages.length}</h1>
          </div>
        }
        right={
          <div className="flex items-center gap-1">
            <Button type="button" color="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button type="button" color="light" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <>
      <BaseScreen.Header
        left={
          <div className="flex items-center gap-2">
            <Avatar
              className="cursor-pointer"
              onClick={() => openRoomInfoModal()}
              size="md"
              src={queries.room.data!.room.thumbnailUrl}
              alt={queries.room.data!.room.name}
            />
            <div className="flex flex-col justify-between">
              <div className="text-[16px] font-medium whitespace-nowrap hover:underline cursor-pointer" onClick={() => openRoomInfoModal()}>
                {queries.room.data!.room.name}
              </div>
              {participantsTypingExceptMe.length > 0 ? <ParticipantsTypingList users={[...participantsTypingExceptMe]} /> : <ParticipantsOnlineCount />}
            </div>
          </div>
        }
        right={
          <div className="flex items-center gap-4">
            <PendingInvitations />
            <MainActions />
          </div>
        }
      />

      <RoomInfoModal ref={roomInfoModalComp} />
    </>
  );
};

export default ScreenMainHeader;
