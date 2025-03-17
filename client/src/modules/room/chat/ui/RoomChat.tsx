// import SendMessageForm from "@/widgets/room-chat/ui/SendMessageForm/SendMessageForm.tsx";
import { useEffect, useMemo, useRef } from "react";
import createRoomChatStore from "@/widgets/room-chat/store";
import { withRoomChatStore } from "../store";
import { useRoomChatEmitter, withRoomChatEmitter } from "../emitter.ts";
import { RoomChatStoreContext, useRoomChatStore } from "@/widgets/room-chat/context";
// import MessagesList from "@/widgets/room-chat/ui/MessagesList.tsx";
// import Header from "@/widgets/room-chat/ui/Header/Header.tsx";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_ME } from "@/widgets/room-chat/gql/tags.ts";
import MeExcludedFromRoomModal from "@/widgets/room-chat/ui/MeExcludedFromRoomModal/MeExcludedFromRoomModal.tsx";
import useGetRoomQuery from "../gql/useGetRoomQuery.ts";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import useGetMessagesQuery from "../gql/useGetMessagesQuery.ts";
import useGetScheduledMessagesQuery from "../gql/useGetScheduledMessagesQuery.ts";
import useRoomParticipantLeaveSub from "../gql/useRoomParticipantLeaveSub.ts";
import ScreenScheduledMessages from "@/widgets/room-chat/ui/screen-scheduled-messages/ScreenScheduledMessages.tsx";
import ScreenMain from "./screen-main/ScreenMain.tsx";
import ScreenSkeletons from "./screen-skeletons/ScreenSkeletons.tsx";
import { usePrevValue } from "@/shared/hooks";
import { RoomChatIdContext } from "../context";

type Props = {
  roomId: number;
  onLeave?: () => void;
};

const RoomChat = (_: Props) => {
  const { tab } = useRoomChatStore();

  useRoomParticipantLeaveSub();

  const queries = {
    me: useQuery(GET_ME),
    room: useRoomQuery(),
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
      <MeExcludedFromRoomModal />
    </>
  );
};

const RoomChatWrapper = (props: Props) => {
  const emitter = useRoomChatEmitter();

  useEffect(() => {
    emitter.on("ROOM_LEAVE", () => {
      props.onLeave?.();
    });
  }, []);

  const roomChatStore = useRef<ReturnType<typeof createRoomChatStore>>(null!);

  const prevRoomId = usePrevValue(props.roomId);

  if (roomChatStore.current === null || props.roomId !== prevRoomId) {
    roomChatStore.current = createRoomChatStore({
      roomId: props.roomId,
    });
  }

  return (
    <RoomChatStoreContext.Provider value={roomChatStore.current}>
      <RoomChatIdContext.Provider value={{ roomId: props.roomId }}>
        <RoomChat {...props} />
      </RoomChatIdContext.Provider>
    </RoomChatStoreContext.Provider>
  );
};

export default withRoomChatEmitter(withRoomChatStore(RoomChatWrapper));
