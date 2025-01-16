import { MdOutlineArrowBack } from "react-icons/md";
import { IconButton } from "@/shared/ui";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import BaseHeader from "@/widgets/room-chat/ui/base/BaseHeader.tsx";

const ScheduledMessagesHeader = () => {
  const { setShowScheduledMessages } = useRoomChatStore();

  return (
    <BaseHeader
      left={
        <div className="flex items-center gap-2">
          <IconButton
            type={"button"}
            Icon={MdOutlineArrowBack}
            color="light"
            onClick={() => {
              setShowScheduledMessages(false);
            }}
          />
          <h1 className="text-[20px] font-medium">Scheduled messages</h1>
        </div>
      }
    />
  );
};

export default ScheduledMessagesHeader;
