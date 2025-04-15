import dayjs from "dayjs";
import BaseMessagesListDivider from "../base/BaseMessagesListDivider";

type Props = {
  scheduledAt: string;
};

const ScheduledMessagesScheduledAtDivider = ({ scheduledAt }: Props) => {
  return <BaseMessagesListDivider>{dayjs(scheduledAt).format("MMMM D, YYYY")}</BaseMessagesListDivider>;
};

export default ScheduledMessagesScheduledAtDivider;
