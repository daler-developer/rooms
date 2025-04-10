import { RoomChatGetMessagesQuery } from "@/__generated__/graphql";
import BaseMessage from "../base/BaseMessage.tsx";
import { useAuth } from "@/modules/auth";
import dayjs from "dayjs";
import { useMemo } from "react";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  message: Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>;
  withSentAtDivider: boolean;
};

const Message = ({ message, withSentAtDivider }: Props) => {
  const { userId } = useAuth();

  const formattedSentAt = useMemo(() => {
    return dayjs(message.sentAt!).format("MMMM D, YYYY");
  }, [message.sentAt]);

  const handleDelete = () => {};

  return (
    <BaseMessage
      selectable
      id={message.id}
      text={message.text}
      imageUrls={message.images.map((image) => image.url)}
      senderIsOnline={message.sender.isOnline}
      senderIsMe={message.sender.id === userId}
      senderFirstName={message.sender.firstName}
      senderLastName={message.sender.lastName}
      senderProfilePictureUrl={message.sender.profilePictureUrl}
      bottomRight={<BaseMessage.SentAt sentAt={message.sentAt!} />}
      bottomLeft={<BaseMessage.ViewsCount viewsCount={message.viewsCount} />}
      divider={withSentAtDivider && <BaseMessage.Divider children={formattedSentAt} />}
      contextMenuActions={[
        {
          label: "Delete",
          Icon: MdDeleteOutline,
          onClick() {
            handleDelete();
          },
        },
      ]}
    />
  );
};

export default Message;
