import { CiCalendar } from "react-icons/ci";
import { IconButton } from "@/shared/ui";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";

const ViewScheduledMessagesButton = () => {
  const { setTab } = useRoomChatStore();

  const queries = {
    room: useRoomQuery(),
  };

  return (
    <IconButton
      type="button"
      Icon={CiCalendar}
      color="light"
      withBadge
      badgeContent={queries.room.data!.room.myScheduledMessagesCount}
      onClick={() => {
        setTab("scheduled-messages");
      }}
    />
  );
};

export default ViewScheduledMessagesButton;
