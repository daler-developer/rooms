import BaseMessagesListDivider from "../base/BaseMessagesListDivider";
import dayjs from "dayjs";

type Props = {
  sentAt: string;
};

const MessagesListSentAtDivider = ({ sentAt }: Props) => {
  return <BaseMessagesListDivider>{dayjs(sentAt).format("MMMM D, YYYY")}</BaseMessagesListDivider>;
};

export default MessagesListSentAtDivider;
