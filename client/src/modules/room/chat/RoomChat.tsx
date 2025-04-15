import { useEffect, useMemo } from "react";
import { withRoomChatStore } from "./store";
import { useRoomChatEmitter, withRoomChatEmitter } from "./emitter.ts";
import { useRoomChatStore } from "./store";
import useGetMeQuery from "./gql/useGetMeQuery.ts";
import ExcludedFromRoomModal from "./excluded-from-room-modal/ExcludedFromRoomModal.tsx";
import useGetRoomQuery from "./gql/useGetRoomQuery.ts";
import useGetMessagesQuery from "./gql/useGetMessagesQuery.ts";
import useGetScheduledMessagesQuery from "./gql/useGetScheduledMessagesQuery.ts";
import useRoomParticipantLeaveSub from "./gql/useRoomParticipantLeaveSub.ts";
import useRoomParticipantTypingStartSub from "./gql/useRoomParticipantTypingStartSub.ts";
import useRoomParticipantTypingStopSub from "./gql/useRoomParticipantTypingStopSub.ts";
import useMessagesDeletedSub from "./gql/useMessagesDeletedSub.ts";
import useNewMessageSub from "./gql/useNewMessageSub.ts";
import useRoomScheduledMessagesCountChangeSub from "./gql/useRoomScheduledMessagesCountChangeSub.ts";
import ScreenScheduledMessages from "./screen-scheduled-messages/ScreenScheduledMessages.tsx";
import ScreenMain from "./screen-main/ScreenMain.tsx";
import ScreenSkeletons from "@/modules/room/chat/screen-skeletons/ScreenSkeletons.tsx";
import { RoomChatIdContext } from "./context";

type Props = {
  roomId: number;
  onClose?: () => void;
};

const RoomChat = (_: Props) => {
  const { tab, messageTextInputEl } = useRoomChatStore();

  useEffect(() => {
    if (messageTextInputEl) {
      messageTextInputEl.focus();
    }
  }, [messageTextInputEl]);

  useRoomParticipantLeaveSub();
  useRoomParticipantTypingStartSub();
  useRoomParticipantTypingStopSub();
  useNewMessageSub();
  useMessagesDeletedSub();
  useRoomScheduledMessagesCountChangeSub();

  const queries = {
    me: useGetMeQuery(),
    room: useGetRoomQuery(),
    messages: useGetMessagesQuery(),
    scheduledMessages: useGetScheduledMessagesQuery(),
  };

  const Screen = useMemo(() => {
    if (queries.messages.loading || queries.room.loading || queries.me.loading || queries.scheduledMessages.loading) {
      return ScreenSkeletons;
    }

    if (tab === "main") {
      return ScreenMain;
    }

    if (tab === "scheduled-messages") {
      return ScreenScheduledMessages;
    }

    throw new Error("error");
  }, [tab, queries.messages.loading, queries.room.loading, queries.me.loading, queries.scheduledMessages.loading]);

  return (
    <>
      <Screen />
      <ExcludedFromRoomModal />
    </>
  );
};

const RoomChatWrapper = (props: Props) => {
  const emitter = useRoomChatEmitter();

  useEffect(() => {
    emitter.on("EXCLUDED_FROM_ROOM", () => {
      props.onClose?.();
    });
  }, []);

  return (
    <RoomChatIdContext.Provider value={{ roomId: props.roomId }}>
      <RoomChat {...props} />
    </RoomChatIdContext.Provider>
  );
};

export default withRoomChatEmitter(withRoomChatStore(RoomChatWrapper));
