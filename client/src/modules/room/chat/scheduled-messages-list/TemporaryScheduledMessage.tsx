import dayjs from "dayjs";
import { type TemporaryScheduledMessage as TemporaryScheduledMessageType } from "../store";
import useGetMeQuery from "../gql/useGetMeQuery";
import BaseMessage from "../base/BaseMessage";
import { useMemo } from "react";

type Props = {
  temporaryScheduledMessage: TemporaryScheduledMessageType;
  withScheduledAtDivider: boolean;
};

const TemporaryScheduledMessage = ({ temporaryScheduledMessage, withScheduledAtDivider }: Props) => {
  const queries = {
    me: useGetMeQuery(),
  };

  const formattedScheduledAt = useMemo(() => {
    return "Scheduled on " + dayjs(temporaryScheduledMessage.scheduledAt!).format("MMMM D, YYYY");
  }, [temporaryScheduledMessage.scheduledAt]);

  return (
    <BaseMessage
      id={temporaryScheduledMessage.id}
      text={temporaryScheduledMessage.text}
      imageUrls={temporaryScheduledMessage.imageUrls}
      senderProfilePictureUrl={queries.me.data!.me.profilePictureUrl}
      senderFirstName={queries.me.data!.me.firstName}
      senderLastName={queries.me.data!.me.lastName}
      senderIsMe={true}
      senderIsOnline={true}
      bottomRight={<BaseMessage.ScheduledAt scheduledAt={temporaryScheduledMessage.scheduledAt!} />}
      divider={withScheduledAtDivider && <BaseMessage.Divider>{formattedScheduledAt}</BaseMessage.Divider>}
    />
  );
};

export default TemporaryScheduledMessage;
