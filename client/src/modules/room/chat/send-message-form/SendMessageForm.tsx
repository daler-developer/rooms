import { useMemo, useRef } from "react";
import { GoPaperclip } from "react-icons/go";
import { v4 as uuid } from "uuid";
import { IconButton, FileUpload } from "@/shared/ui";
import { useFilePaste } from "@/shared/hooks";
import { useMutation, useApolloClient } from "@apollo/client";
import { GrSend } from "react-icons/gr";
import { useForm, FormProvider } from "@/shared/lib/form";
import { SEND_MESSAGE_MUTATION, SCHEDULE_MESSAGE_MUTATION } from "../gql/tags";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { TemporaryMessage, TemporaryScheduledMessage } from "../store";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import ScheduleMessageModal, { ScheduleMessageModalHandle } from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";
import { flushSync } from "react-dom";
import useGetRoomQuery from "../gql/useGetRoomQuery.ts";
import ViewScheduledMessagesButton from "./ViewScheduledMessagesButton.tsx";
import * as yup from "yup";
import UploadedImages from "./uploaded-images/UploadedImages.tsx";
import { FormFields } from "./types.ts";
import MessageTextInput from "./MessageTextInput.tsx";

type Props = {
  showScheduledMessagesButton?: boolean;
  onlyScheduledMessages?: boolean;
};

export type Fields = {
  text: string;
  scheduleAt: string | null;
  images: Array<{
    key: string;
    fileObject: File;
    imageUrl: string | null;
    isLoading: boolean;
  }>;
};

const validationSchema = yup.object({});

const SendMessageForm = ({ showScheduledMessagesButton = true, onlyScheduledMessages = false }: Props) => {
  const { roomId, addTemporaryMessage, removeTemporaryMessage, addTemporaryScheduledMessage, removeTemporaryScheduledMessage } = useRoomChatStore();

  const form = useForm<FormFields>({
    initialValues: {
      text: "",
      images: [],
      scheduleAt: null,
    },
    resetAfterSubmit: false,
    validationSchema,
    async onSubmit(values) {
      form.reset();

      if (values.scheduleAt) {
        const temporaryScheduledMessage: TemporaryScheduledMessage = {
          temporaryId: uuid(),
          text: values.text,
          scheduledAt: values.scheduleAt,
          isTemporary: true,
        };

        flushSync(() => {
          addTemporaryScheduledMessage(temporaryScheduledMessage);
        });

        // emitter.emit("SCHEDULED_MESSAGE_INSERTED");

        // apolloClient.cache.modify({
        //   id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
        //   fields: {
        //     myScheduledMessagesCount(prevCount: number) {
        //       return prevCount + 1;
        //     },
        //   },
        // });

        scheduleMessage({
          variables: {
            input: {
              roomId,
              text: values.text,
              scheduleAt: values.scheduleAt,
              imageUrls: [],
            },
          },
          onCompleted() {
            removeTemporaryScheduledMessage(temporaryScheduledMessage.temporaryId);
          },
          update(cache, { data }) {
            cache.modify({
              id: cache.identify({ __typename: "Room", id: roomId }),
              fields: {
                scheduledMessages(prevData) {
                  return {
                    ...prevData,
                    data: [...prevData.data, data!.scheduleMessage],
                  };
                },
              },
            });
          },
        });
      } else {
        const temporaryMessage: TemporaryMessage = {
          temporaryId: uuid(),
          text: values.text,
          sentAt: new Date().toISOString(),
          imageUrls: values.images.map((image) => image.imageUrl!),
          isTemporary: true,
        };

        const input = {
          roomId,
          text: values.text,
          imageUrls: values.images.map((image) => image.imageUrl!),
        };

        sendMessage({
          variables: {
            input,
          },
          onCompleted() {
            removeTemporaryMessage(temporaryMessage.temporaryId);
          },
          update(cache, { data: mutationData }) {
            const newMessage = mutationData!.sendMessage;

            cache.modify({
              id: cache.identify(data!.room),
              fields: {
                messages(oldData, { toReference }) {
                  return {
                    data: [toReference(newMessage), ...oldData.data],
                    hasMore: oldData.hasMore,
                  };
                },
              },
            });
          },
        });

        flushSync(() => {
          addTemporaryMessage(temporaryMessage);
        });

        // emitter.emit("MESSAGE_INSERTED", {
        //   isMessageSentByCurrentUser: true,
        // });
      }
    },
  });

  const { data } = useGetRoomQuery();

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const [scheduleMessage] = useMutation(SCHEDULE_MESSAGE_MUTATION);

  const scheduleMessageModalComp = useRef<ScheduleMessageModalHandle>(null!);
  const hiddenSubmitBtn = useRef<HTMLInputElement>(null!);

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

  const viewerHasScheduledMessages = useMemo(() => {
    return data!.room.myScheduledMessagesCount > 0;
  }, [data]);

  const sendMessageDropdownItems = [
    {
      label: "Schedule",
      onClick: handleSchedule,
    },
  ];

  const handleSendClick = async () => {
    if (onlyScheduledMessages) {
      await handleSchedule();
    } else {
      hiddenSubmitBtn.current.click();
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (onlyScheduledMessages) {
        await handleSchedule();
      }

      if (!onlyScheduledMessages && !isTextInputEmpty) {
        hiddenSubmitBtn.current.click();
      }
    }
  };

  const hasLoadingImages = Boolean(form.getValue("images").find((image) => image.isLoading));

  const sendButton = <IconButton disabled={isTextInputEmpty || hasLoadingImages} type="button" Icon={GrSend} color="default" onClick={handleSendClick} />;

  useFilePaste({
    multiple: true,
    accept: "image/*",
    onUpload(files) {
      appendMessageImages(files);
    },
  });

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

            {viewerHasScheduledMessages && showScheduledMessagesButton && <ViewScheduledMessagesButton />}

            {onlyScheduledMessages ? (
              sendButton
            ) : (
              <Dropdown isActive={!isTextInputEmpty} openTrigger="contextmenu" trigger={sendButton} items={sendMessageDropdownItems} />
            )}

            {form.getValue("images").length > 0 && <UploadedImages />}
          </div>

          <input ref={hiddenSubmitBtn} type="submit" hidden />
        </form>
      </FormProvider>

      <ScheduleMessageModal ref={scheduleMessageModalComp} />
    </>
  );
};

export default SendMessageForm;
