import { useRoomChatStore } from "@/widgets/room-chat/context";
import { Button } from "@/shared/ui";
import BaseTabHeader from "@/widgets/room-chat/ui/base/BaseTabHeader.tsx";
import useDeleteMessagesMutation from "../../../gql/useDeleteMessagesMutation.ts";

const SelectedMessagesController = () => {
  const { roomId, selectedMessages, clearSelectedMessages } = useRoomChatStore();

  const [deleteMessages, { loading: isDeletingMessages }] = useDeleteMessagesMutation();

  const handleDelete = async () => {
    deleteMessages({
      roomId,
      messageIds: selectedMessages,
    });
    clearSelectedMessages();
  };

  const handleCancel = () => {
    clearSelectedMessages();
  };

  return (
    <BaseTabHeader
      left={
        <div className="flex items-center gap-2">
          <h1 className="text-[18px] font-medium text-gray-900">Selected: {selectedMessages.length}</h1>
        </div>
      }
      right={
        <div className="flex items-center gap-1">
          <Button type="button" color="red" isLoading={isDeletingMessages} onClick={handleDelete}>
            Delete
          </Button>
          <Button type="button" color="light" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      }
    />
  );
};

export default SelectedMessagesController;
