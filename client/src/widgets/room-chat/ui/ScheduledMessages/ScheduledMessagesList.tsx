import BaseMessagesList from "@/widgets/room-chat/ui/base/BaseMessagesList.tsx";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import ScheduledMessage from "@/widgets/room-chat/ui/ScheduledMessages/ScheduledMessage.tsx";

const ScheduledMessagesList = () => {
  const queries = {
    room: useRoomQuery(),
  };

  return (
    <BaseMessagesList onScrollToTop={() => {}} onReachTopThreshold={() => {}} showSpinner={false}>
      {queries.room.data!.room.scheduledMessages.data.map((message) => (
        <ScheduledMessage key={message.id} message={message} />
      ))}
    </BaseMessagesList>
  );
};

export default ScheduledMessagesList;
