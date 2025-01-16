import { useMemo } from "react";
import dayjs from "dayjs";

type Props = {
  scheduledAt: string;
};

const BaseScheduledAt = ({ scheduledAt }: Props) => {
  const formatted = useMemo(() => {
    return `Scheduled at: ${String(dayjs(scheduledAt).hour()).padStart(2, "0")}:${String(dayjs(scheduledAt).minute()).padStart(2, "0")}`;
  }, [scheduledAt]);

  return <span className="text-[10px] italic">{formatted}</span>;
};

export default BaseScheduledAt;
