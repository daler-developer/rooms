import { useMemo } from "react";
import dayjs from "dayjs";

type Props = {
  scheduledAt: string;
};

const BaseMessageScheduledAt = ({ scheduledAt }: Props) => {
  const formattedScheduledAt = useMemo(() => {
    return `Scheduled at: ${String(dayjs(scheduledAt).hour()).padStart(2, "0")}:${String(dayjs(scheduledAt).minute()).padStart(2, "0")}`;
  }, [scheduledAt]);

  return <span className="text-[9px] italic">{formattedScheduledAt}</span>;
};

export default BaseMessageScheduledAt;
