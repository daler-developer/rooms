import { Button, ContextMenu, IconButton, Input, Scroll } from "@/shared/ui";
import { ElementRef, SyntheticEvent, useEffect, useMemo, useRef } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { GrSend } from "react-icons/gr";
import { GET_ROOM, NOTIFY_ME_IS_TYPING, SEND_MESSAGE_MUTATION, SCHEDULE_MESSAGE_MUTATION } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { v4 as uuid } from "uuid";
import SendMessageFormUploadedImage from "@/widgets/room-chat/ui/SendMessageFormUploadedImage.tsx";
import { TemporaryMessage, TemporaryScheduledMessage } from "@/widgets/room-chat/store";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import ScheduleMessageModal, { ScheduleMessageModalHandle } from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";
import scheduleMessageModal from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";
import { flushSync } from "react-dom";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import { CiCalendar } from "react-icons/ci";
import ViewScheduledMessagesButton from "@/widgets/room-chat/ui/SendMessageForm/ViewScheduledMessagesButton.tsx";
import { useForm, FormProvider } from "@/shared/lib/form";
import * as yup from "yup";
import UploadedImages from "@/widgets/room-chat/ui/SendMessageForm/uploaded-images/UploadedImages.tsx";
import emitter from "../../emitter";

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

  const inputHandle = useRef<ElementRef<typeof Input>>(null!);

  const apolloClient = useApolloClient();

  useEffect(() => {
    inputHandle.current.focus();
  }, []);

  const form = useForm<Fields>({
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

        emitter.emit("SCHEDULED_MESSAGE_INSERTED");

        apolloClient.cache.modify({
          id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
          fields: {
            myScheduledMessagesCount(prevCount: number) {
              return prevCount + 1;
            },
          },
        });

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

        // sendMessage({
        //   variables: {
        //     input,
        //   },
        //   onCompleted() {
        //     removeTemporaryMessage(temporaryMessage.temporaryId);
        //   },
        //   update(cache, { data: mutationData }) {
        //     const newMessage = mutationData!.sendMessage;
        //
        //     cache.modify({
        //       id: cache.identify(data!.room),
        //       fields: {
        //         messages(oldData, { toReference }) {
        //           return {
        //             data: [toReference(newMessage), ...oldData.data],
        //             hasMore: oldData.hasMore,
        //           };
        //         },
        //       },
        //     });
        //   },
        // });

        flushSync(() => {
          addTemporaryMessage(temporaryMessage);
        });

        emitter.emit("MESSAGE_INSERTED", {
          isMessageSentByCurrentUser: true,
        });
      }
    },
  });

  const { data } = useRoomQuery();

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const [scheduleMessage] = useMutation(SCHEDULE_MESSAGE_MUTATION);

  const [notifyMeIsTyping] = useMutation(NOTIFY_ME_IS_TYPING);

  const scheduleMessageModalComp = useRef<ScheduleMessageModalHandle>(null!);
  const hiddenSubmitBtn = useRef<HTMLInputElement>(null!);

  const isTextInputEmpty = !form.getValue("text").trim();

  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      event.preventDefault();

      const clipboardData = event.clipboardData || window.clipboardData;

      if (clipboardData && clipboardData.files.length > 0) {
        for (const image of Array.from(clipboardData.files)) {
          form.appendArrayItem("images", {
            key: uuid(),
            fileObject: image,
            imageUrl: null,
            isLoading: false,
          });
        }
      }
    };

    window.addEventListener("paste", handler);

    return () => {
      window.removeEventListener("paste", handler);
    };
  }, []);

  const handleChange = (e) => {
    const hasText = Boolean(e.target.value.trim());

    if (hasText) {
      notifyMeIsTyping({
        variables: {
          roomId,
          isTyping: true,
        },
      });
    } else {
      notifyMeIsTyping({
        variables: {
          roomId,
          isTyping: false,
        },
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

  return (
    <>
      <FormProvider form={form}>
        <form className="h-full" onSubmit={form.handleSubmit}>
          <div className="h-full relative flex items-center bg-white px-2 gap-2">
            {form.renderField("text", ({ getFieldProps }) => (
              <Input
                ref={inputHandle}
                onKeyDown={handleKeyDown}
                className="flex-grow"
                placeholder="Message text"
                {...getFieldProps({
                  onChange: handleChange,
                })}
              />
            ))}
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
