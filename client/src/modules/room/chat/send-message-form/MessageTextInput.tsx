import { KeyboardEventHandler, useEffect, useRef } from "react";
import { usePrevValue } from "@/shared/hooks";
import { useFormContext } from "@/shared/lib/form";
import { Input } from "@/shared/ui";
import { useRoomId } from "../context";
import { useRoomChatStore } from "../store";
import { FormFields } from "./types";
import useNotifyTypingStartMutation from "../gql/useNotifyTypingStartMutation.ts";
import useNotifyTypingStopMutation from "../gql/useNotifyTypingStopMutation.ts";
import ScheduleMessageModal, { type ScheduleMessageModalHandle } from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";

const MessageTextInput = () => {
  const roomId = useRoomId();

  const { messageTextInputEl, setMessageTextInputEl, tab, hiddenSubmitButton } = useRoomChatStore();

  const scheduleMessageModalComp = useRef<ScheduleMessageModalHandle>(null!);

  const form = useFormContext<FormFields>();

  const text = form.getValue("text");
  const prevText = usePrevValue(text);
  const isDirty = form.isDirty("text");

  const mutations = {
    notifyTypingStart: useNotifyTypingStartMutation(),
    notifyTypingStop: useNotifyTypingStopMutation(),
  };

  useEffect(() => {
    const isTextEmpty = text === "";
    const isPrevTextEmpty = prevText === "";

    if (isDirty && isPrevTextEmpty && !isTextEmpty) {
      mutations.notifyTypingStart.mutate({
        variables: {
          roomId,
        },
      });
    }

    if (isDirty && !isPrevTextEmpty && isTextEmpty) {
      mutations.notifyTypingStop.mutate({
        variables: {
          roomId,
        },
      });
    }
  }, [isDirty, text, prevText]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const isTextInputEmpty = form.getValue("text").trim() === "";

      if (tab === "main" && !isTextInputEmpty) {
        hiddenSubmitButton!.click();
      }

      if (tab === "scheduled-messages" && !isTextInputEmpty) {
        const dateTime = await scheduleMessageModalComp.current.open();
        form.setValue("scheduleAt", dateTime);
        hiddenSubmitButton!.click();
      }
    }
  };

  return (
    <>
      {form.renderField("text", ({ getFieldProps }) => (
        <Input
          ref={(el) => {
            if (el !== messageTextInputEl) {
              setMessageTextInputEl(el);
            }
          }}
          className="flex-grow"
          placeholder="Message text"
          {...getFieldProps()}
          onKeyDown={handleKeyDown}
        />
      ))}

      <ScheduleMessageModal ref={scheduleMessageModalComp} />
    </>
  );
};

export default MessageTextInput;
