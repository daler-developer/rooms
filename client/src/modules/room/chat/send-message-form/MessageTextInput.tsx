import { useEffect } from "react";
import { useFormContext } from "@/shared/lib/form";
import { Input } from "@/shared/ui";
import { useRoomId } from "../context";
import { FormFields } from "./types";
import useNotifyTypingStartMutation from "../gql/useNotifyTypingStartMutation.ts";
import useNotifyTypingStopMutation from "../gql/useNotifyTypingStopMutation.ts";
import { usePrevValue } from "@/shared/hooks";

const MessageTextInput = () => {
  const roomId = useRoomId();

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

  return form.renderField("text", ({ getFieldProps }) => <Input className="flex-grow" placeholder="Message text" {...getFieldProps()} />);
};

export default MessageTextInput;
