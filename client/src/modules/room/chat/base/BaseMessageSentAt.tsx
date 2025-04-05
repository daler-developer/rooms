import { useMemo } from "react";
import dayjs from "dayjs";

type Props = {
  sentAt: string;
};

const BaseMessageSentAt = ({ sentAt }: Props) => {
  const formattedSentAt = useMemo(() => {
    if (!sentAt) {
      return "";
    }

    return `${String(dayjs(sentAt).hour()).padStart(2, "0")}:${String(dayjs(sentAt).minute()).padStart(2, "0")}`;
  }, [sentAt]);

  return <span className="text-[9px]">{formattedSentAt}</span>;
};

export default BaseMessageSentAt;
