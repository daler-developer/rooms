import { useMemo } from "react";
import dayjs from "dayjs";

type Props = {
  sentAt: string;
};

const BaseSentAt = ({ sentAt }: Props) => {
  const formatted = useMemo(() => {
    return `${String(dayjs(sentAt).hour()).padStart(2, "0")}:${String(dayjs(sentAt).minute()).padStart(2, "0")}`;
  }, [sentAt]);

  return <span className="text-[11px]">{formatted}</span>;
};

export default BaseSentAt;
