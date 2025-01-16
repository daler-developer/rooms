import { Button, ContextMenu, IconButton, Input, Scroll } from "@/shared/ui";
import { SyntheticEvent, useEffect, useMemo, useRef } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { GrSend } from "react-icons/gr";
import { GET_ROOM, NOTIFY_ME_IS_TYPING, SEND_MESSAGE_MUTATION, SCHEDULE_MESSAGE_MUTATION } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { v4 as uuid } from "uuid";
import SendMessageFormUploadedImage from "@/widgets/room-chat/ui/SendMessageFormUploadedImage.tsx";
import { TemporaryMessage } from "@/widgets/room-chat/store";
import Dropdown from "@/shared/ui/components/Dropdown/Dropdown.tsx";
import ScheduleMessageModal, { ScheduleMessageModalHandle } from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";
import scheduleMessageModal from "@/widgets/room-chat/ui/ScheduleMessage/ScheduleMessageModal.tsx";
import { flushSync } from "react-dom";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import { CiCalendar } from "react-icons/ci";
import ViewScheduledMessagesButton from "@/widgets/room-chat/ui/SendMessageForm/ViewScheduledMessagesButton.tsx";

const SendMessageForm = () => {
  const { roomId, images, setShowScheduledMessages, text, setText, removeAllImages, addTemporaryMessage, removeTemporaryMessage, addImage } =
    useRoomChatStore();

  const isUploadingImages = Boolean(images.find((image) => image.isLoading));

  const { data } = useRoomQuery();

  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
  const [scheduleMessage] = useMutation(SCHEDULE_MESSAGE_MUTATION);

  const [notifyMeIsTyping] = useMutation(NOTIFY_ME_IS_TYPING);

  const scheduleMessageModalComp = useRef<ScheduleMessageModalHandle>(null!);

  const apolloClient = useApolloClient();

  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      event.preventDefault();

      const clipboardData = event.clipboardData || window.clipboardData;

      if (clipboardData && clipboardData.files.length > 0) {
        for (const image of Array.from(clipboardData.files)) {
          addImage(uuid(), image);
        }
      }
    };

    window.addEventListener("paste", handler);

    return () => {
      window.removeEventListener("paste", handler);
    };
  }, []);

  const resetForm = () => {
    setText("");
    removeAllImages();
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const temporaryMessage: TemporaryMessage = {
      temporaryId: uuid(),
      text,
    };

    addTemporaryMessage(temporaryMessage);

    const input = {
      roomId,
      text,
      imageUrls: images.map((image) => image.imageUrl!),
    };

    resetForm();

    await sendMessage({
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
            messages(oldData) {
              return {
                data: [newMessage, ...oldData.data],
                hasMore: oldData.hasMore,
              };
            },
          },
        });
      },
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);

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

    const input = {
      roomId,
      text,
      imageUrls: images.map((image) => image.imageUrl!),
      scheduleAt: dateTime,
    };

    resetForm();

    apolloClient.cache.modify({
      id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
      fields: {
        myScheduledMessagesCount(prevCount: number) {
          return prevCount + 1;
        },
      },
    });

    await scheduleMessage({
      variables: {
        input,
      },
    });
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

  return (
    <>
      <form className="shrink-0" onSubmit={handleSubmit}>
        <div className="relative flex bg-white border-t border-gray-400 p-2 gap-2">
          <Input className="flex-grow" placeholder="Message text" value={text} onChange={handleChange} />
          {/*{viewerHasScheduledMessages && <ViewScheduledMessagesButton />}*/}
          <Dropdown openTrigger="contextmenu" trigger={<IconButton disabled={isUploadingImages} type="submit" Icon={GrSend} color="default" />} items={[]} />

          {Object.keys(images).length > 0 && (
            <div className="absolute bottom-[100%] left-0 right-0">
              <Scroll className="h-[150px] w-full flex gap-2">
                {images.length > 0 && images.map((image) => <SendMessageFormUploadedImage key={image.key} imageKey={image.key} />)}
              </Scroll>
            </div>
          )}
        </div>
      </form>

      <ScheduleMessageModal ref={scheduleMessageModalComp} />
    </>
  );
};

export default SendMessageForm;
