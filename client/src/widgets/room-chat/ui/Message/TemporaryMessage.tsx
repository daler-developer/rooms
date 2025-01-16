import { type TemporaryMessage } from "@/widgets/room-chat/store";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../gql/tags";
import BaseMessage from "@/widgets/room-chat/ui/base/BaseMessage.tsx";
import BaseSentAt from "@/widgets/room-chat/ui/base/BaseSentAt.tsx";
import BaseViewsCount from "@/widgets/room-chat/ui/base/BaseViewsCount.tsx";

type Props = {
  temporaryMessage: TemporaryMessage;
};

const TemporaryMessage = ({ temporaryMessage }: Props) => {
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
      bottomRight={<BaseSentAt sentAt={temporaryMessage.sentAt} />}
      bottomLeft={<BaseViewsCount count={0} />}
    >
      <div>{temporaryMessage.text}</div>
    </BaseMessage>
  );
};

export default TemporaryMessage;
