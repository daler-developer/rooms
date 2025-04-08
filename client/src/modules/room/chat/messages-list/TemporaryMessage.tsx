import dayjs from "dayjs";
import { useMemo } from "react";
import BaseMessage from "../base/BaseMessage.tsx";
import { TemporaryMessage as TemporaryMessageType } from "../store";
import useGetMeQuery from "../gql/useGetMeQuery.ts";

type Props = {
  temporaryMessage: TemporaryMessageType;
  withSentAtDivider: boolean;
};

const TemporaryMessage = ({ temporaryMessage, withSentAtDivider }: Props) => {
  const queries = {
    me: useGetMeQuery(),
  };

  const formattedSentAt = useMemo(() => {
    return dayjs(temporaryMessage.sentAt!).format("MMMM D, YYYY");
  }, [temporaryMessage.sentAt]);

  return (
    <BaseMessage
      id={temporaryMessage.id}
      text={temporaryMessage.text}
      imageUrls={temporaryMessage.imageUrls}
      senderIsOnline={true}
      senderIsMe={true}
      senderFirstName={queries.me.data!.me.firstName}
      senderLastName={queries.me.data!.me.lastName}
      senderProfilePictureUrl={queries.me.data!.me.profilePictureUrl}
      bottomRight={<BaseMessage.SentAt sentAt={temporaryMessage.sentAt} />}
      bottomLeft={<BaseMessage.ViewsCount viewsCount={0} />}
      divider={withSentAtDivider && <BaseMessage.Divider children={formattedSentAt} />}
    />
  );
};

export default TemporaryMessage;
