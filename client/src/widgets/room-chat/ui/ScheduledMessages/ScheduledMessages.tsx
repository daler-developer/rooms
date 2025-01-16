import ScheduledMessagesHeader from "./ScheduledMessagesHeader.tsx";
import ScheduledMessagesList from "./ScheduledMessagesList.tsx";

const ScheduledMessages = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-300">
      <ScheduledMessagesHeader />
      <ScheduledMessagesList />
    </div>
  );
};

export default ScheduledMessages;
