import { type TemporaryScheduledMessage } from "@/widgets/room-chat/store";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../gql/tags";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";
import BaseScheduledAt from "@/widgets/room-chat/ui/base/BaseScheduledAt.tsx";
import BaseViewsCount from "@/widgets/room-chat/ui/base/BaseViewsCount.tsx";

type Props = {
  temporaryScheduledMessage: TemporaryScheduledMessage;
};

const TemporaryScheduledMessage = ({ temporaryScheduledMessage }: Props) => {
  const queries = {
    me: useQuery(GET_ME),
  };

  return (
    <BaseMessage
      align="end"
      avatarBadgeColor="green"
      profilePictureUrl={queries.me.data!.me.profilePictureUrl}
      isSelected={false}
      isInSelectMode={false}
      bottomRight={<BaseScheduledAt scheduledAt={temporaryScheduledMessage.scheduledAt!} />}
    >
      <div>{temporaryScheduledMessage.text}</div>
    </BaseMessage>
  );
};

export default TemporaryScheduledMessage;
