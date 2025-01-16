import { type GetRoomQuery } from "@/__generated__/graphql.ts";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";

type Props = {
  message: Flatten<GetRoomQuery["room"]["scheduledMessages"]["data"]>;
};

const ScheduledMessage = ({ message }: Props) => {
  return (
    <BaseMessage profilePictureUrl={message.sender.profilePictureUrl} align="end" avatarBadgeColor={message.sender.isOnline ? "green" : "gray"}>
      <div>{message.text}</div>
    </BaseMessage>
  );
};

export default ScheduledMessage;
