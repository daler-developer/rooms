import { IconButton, Button } from "@/shared/ui";
import { MdOutlineArrowBack } from "react-icons/md";
import { useRoomId } from "../context";
import { useRoomChatStore } from "../store";
import BaseScreen from "../base/BaseScreen";
import useDeleteMessagesMutation from "../../gql/useDeleteMessagesMutation";

const ScreenScheduledMessagesHeader = () => {
  const { setTab, selectedScheduledMessages, clearScheduledSelectedMessages } = useRoomChatStore();

  const roomId = useRoomId();

  const handleDelete = async () => {
    // deleteMessages({
    //   roomId,
    //   messageIds: selectedScheduledMessages,
    // });
    clearScheduledSelectedMessages();
  };

  const handleCancel = () => {
    clearScheduledSelectedMessages();
  };

  if (selectedScheduledMessages.length > 0) {
    return (
      <BaseScreen.Header
        left={
          <div className="flex items-center gap-2 pl-4">
            <h1 className="text-[18px] font-medium text-gray-900">Selected: {selectedScheduledMessages.length}</h1>
          </div>
        }
        right={
          <div className="flex items-center gap-2">
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
    <BaseScreen.Header
      left={
        <div className="flex items-center gap-2">
          <IconButton
            type={"button"}
            Icon={MdOutlineArrowBack}
            color="light"
            onClick={() => {
              setTab("main");
            }}
          />
          <h1 className="text-[20px] font-medium">Scheduled messages</h1>
        </div>
      }
    />
  );
};

export default ScreenScheduledMessagesHeader;
