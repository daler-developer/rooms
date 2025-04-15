import { useEffect, useRef } from "react";
import * as yup from "yup";
import { GoPaperclip } from "react-icons/go";
import { v4 as uuid } from "uuid";
import { IconButton, FileUpload, Dropdown, VisuallyHiddenInput } from "@/shared/ui";
import { useFilePaste } from "@/shared/hooks";
import { GrSend } from "react-icons/gr";
import { useForm, FormProvider } from "@/shared/lib/form";
import { useRoomChatStore } from "../store";
import useGetRoomQuery from "../gql/useGetRoomQuery.ts";
import ViewScheduledMessagesButton from "./ViewScheduledMessagesButton.tsx";
import UploadedImages from "./uploaded-images/UploadedImages.tsx";
import { FormFields } from "./types.ts";
import MessageTextInput from "./MessageTextInput.tsx";
import useHandleSendMessage from "./useHandleSendMessage.ts";
import useHandleScheduleMessage from "./useHandleScheduleMessage.ts";
import ScheduleMessageModal, { ScheduleMessageModalHandle } from "./ScheduleMessageModal.tsx";

const validationSchema = yup.object({});

const SendMessageForm = () => {
  const { tab, setHiddenSubmitButton, messageTextInputEl } = useRoomChatStore();

  const hiddenSubmitBtn = useRef<HTMLInputElement>(null!);

  const handleSendMessage = useHandleSendMessage();
  const handleScheduleMessage = useHandleScheduleMessage();

  useEffect(() => {
    setHiddenSubmitButton(hiddenSubmitBtn.current);

    return () => {
      setHiddenSubmitButton(null);
    };
  }, [setHiddenSubmitButton]);

  const form = useForm<FormFields>({
    initialValues: {
      text: "",
      images: [],
      scheduleAt: null,
    },
    resetAfterSubmit: false,
    validationSchema,
    async onSubmit(values) {
      if (values.scheduleAt) {
        handleScheduleMessage(values);
      } else {
        handleSendMessage(values);
      }

      messageTextInputEl!.focus();
      form.reset();
    },
  });

  const queries = {
    room: useGetRoomQuery(),
  };

  const scheduleMessageModalComp = useRef<ScheduleMessageModalHandle>(null!);

  const isTextInputEmpty = !form.getValue("text").trim();

  const appendMessageImages = (images: File[]) => {
    for (const image of images) {
      form.appendArrayItem("images", {
        key: uuid(),
        fileObject: image,
        imageUrl: null,
        isLoading: false,
      });
    }
  };

  const handleSchedule = async () => {
    const dateTime = await scheduleMessageModalComp.current.open();

    form.setValue("scheduleAt", dateTime);

    hiddenSubmitBtn.current.click();
  };

  const viewerHasScheduledMessages = queries.room.data!.room.scheduledMessagesCount > 0;

  const handleSendClick = async () => {
    if (tab === "scheduled-messages") {
      const dateTime = await scheduleMessageModalComp.current.open();

      form.setValue("scheduleAt", dateTime);
    }

    hiddenSubmitBtn.current.click();
  };

  useFilePaste({
    multiple: true,
    accept: "image/*",
    onUpload(files) {
      appendMessageImages(files);
    },
  });

  const hasLoadingImages = form.getValue("images").some((image) => image.isLoading);
  const hasUploadedImages = form.getValue("images").length > 0;
  const disableSendButton = isTextInputEmpty || hasLoadingImages;

  return (
    <>
      <FormProvider form={form}>
        <form className="h-full" onSubmit={form.handleSubmit}>
          <div className="h-full relative flex items-center bg-white px-2 gap-2">
            <FileUpload
              multiple
              accept="image/*"
              trigger={<IconButton type="button" color="light" Icon={GoPaperclip} />}
              onUpload={(files) => appendMessageImages(files)}
            />

            <MessageTextInput />

            {viewerHasScheduledMessages && tab === "main" && <ViewScheduledMessagesButton />}

            <Dropdown
              placement="top-right"
              isActive={tab === "main" && !disableSendButton}
              openTrigger="contextmenu"
              trigger={<IconButton disabled={disableSendButton} type="button" Icon={GrSend} color="default" onClick={handleSendClick} />}
              items={[
                {
                  label: "Schedule",
                  onClick: handleSchedule,
                },
              ]}
            />

            {hasUploadedImages && <UploadedImages />}
          </div>

          <VisuallyHiddenInput type="submit" ref={hiddenSubmitBtn} />
        </form>
      </FormProvider>

      <ScheduleMessageModal ref={scheduleMessageModalComp} />
    </>
  );
};

export default SendMessageForm;
