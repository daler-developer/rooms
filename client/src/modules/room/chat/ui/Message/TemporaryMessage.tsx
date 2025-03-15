import { type TemporaryMessage } from "@/widgets/room-chat/store";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../gql/tags";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";

type Props = {
  temporaryMessage: TemporaryMessage;
};

const TemporaryMessage = ({ temporaryMessage }: Props) => {
  const queries = {
    me: useQuery(GET_ME),
  };

  return (
    <BaseMessage
      isSelected={false}
      isInSelectMode={false}
      senderIsOnline={true}
      senderIsMe={true}
      senderProfilePictureUrl={queries.me.data!.me.profilePictureUrl}
      senderFirstName={queries.me.data!.me.firstName}
      senderLastName={queries.me.data!.me.lastName}
      viewsCount={0}
      sentAt={temporaryMessage.sentAt!}
      imageUrls={temporaryMessage.imageUrls}
    >
      <div>{temporaryMessage.text}</div>
    </BaseMessage>
  );
};

export default TemporaryMessage;
