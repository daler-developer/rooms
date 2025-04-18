import { ElementRef, forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Button, Calendar, Modal, TimeInput, type Time } from "@/shared/ui";
import dayjs, { Dayjs } from "dayjs";

export type ScheduleMessageModalHandle = {
  open: () => Promise<string>;
};

const ScheduleMessageModal = forwardRef<ScheduleMessageModalHandle>((_, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState<Dayjs>(() => dayjs());
  const [time, setTime] = useState<Time>({
    hours: 12,
    minutes: 34,
  });

  const promiseResolveFunc = useRef<any>(null);
  const promiseRejectFunc = useRef<any>(null);

  const timeInput = useRef<ElementRef<typeof TimeInput>>(null!);
  const calendar = useRef<ElementRef<typeof Calendar>>(null!);

  useImperativeHandle(ref, () => ({
    async open() {
      setShowModal(true);

      const currentTimePlus10MinutesForward = dayjs().add(10, "minutes");

      calendar.current.setValue(currentTimePlus10MinutesForward);
      timeInput.current.setValue({
        hours: currentTimePlus10MinutesForward.hour(),
        minutes: currentTimePlus10MinutesForward.minute(),
      });

      return new Promise((res, rej) => {
        promiseResolveFunc.current = res;
        promiseRejectFunc.current = rej;
      });
    },
  }));

  const isSelectedToday = date.isSame(dayjs(), "day");

  const formattedDate = useMemo(() => {
    return date.format("MMM D, YYYY");
  }, [date]);

  const formattedTime = useMemo(() => {
    return `${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}`;
  }, [time]);

  const handleClose = () => {
    setShowModal(false);
    promiseRejectFunc.current(null);
  };

  const handleSend = () => {
    setShowModal(false);
    const result = date.hour(time.hours).minute(time.minutes).toISOString();
    promiseResolveFunc.current(result);
  };

  return (
    <Modal size="sm" title="Schedule message" isOpen={showModal} onClose={handleClose}>
      <div>
        <Calendar ref={calendar} minDate={dayjs()} value={date} onChange={setDate} />

        <div className="mt-4 flex justify-center">
          <TimeInput ref={timeInput} value={time} onChange={setTime} />
        </div>

        <div className="mt-4">
          <Button fullWidth type="button" size="lg" onClick={handleSend}>
            {isSelectedToday && `Send today at ${formattedTime}`}
            {!isSelectedToday && `Send on ${formattedDate} at ${formattedTime}`}
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default ScheduleMessageModal;
