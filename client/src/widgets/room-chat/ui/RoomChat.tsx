// import SendMessageForm from "@/widgets/room-chat/ui/SendMessageForm/SendMessageForm.tsx";
import { useMemo, useRef } from "react";
import createRoomChatStore from "@/widgets/room-chat/store";
import { RoomChatStoreContext, useRoomChatStore } from "@/widgets/room-chat/context";
// import MessagesList from "@/widgets/room-chat/ui/MessagesList.tsx";
// import Header from "@/widgets/room-chat/ui/Header/Header.tsx";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_ME } from "@/widgets/room-chat/gql/tags.ts";
// import MeExcludedFromRoomModal from "@/widgets/room-chat/ui/MeExcludedFromRoomModal/MeExcludedFromRoomModal.tsx";
import { usePrevValue } from "@/shared/hooks";
import useRoomQuery from "@/widgets/room-chat/hooks/useRoomQuery.ts";
import TabScheduledMessages from "./tab-scheduled-messages/TabScheduledMessages";
import TabMain from "./tab-main/TabMain";

type Props = {
  roomId: number;
};

const RoomChat = (_: Props) => {
  const { tab } = useRoomChatStore();

  const { loading: isLoadingRoom, data } = useRoomQuery();

  const { loading: isLoadingMe } = useQuery(GET_ME);

  if (isLoadingRoom || isLoadingMe) {
    return "Loading...";
  }

  if (!data) {
    return null;
  }

  if (tab === "main") {
    return <TabMain />;
  }

  if (tab === "scheduled-messages") {
    return <TabScheduledMessages />;
  }

  // if (showScheduledMessages) {
  //   return <ScheduledMessages />;
  // }

  // return (
  //   <div className="w-full h-screen flex flex-col bg-gray-300">
  //     <Header />
  //     <MessagesList />
  //     <SendMessageForm />
  //     <MeExcludedFromRoomModal />
  //   </div>
  // );
};

const RoomChatWrapper = (props: Props) => {
  const roomChatStore = useRef<ReturnType<typeof createRoomChatStore>>(null!);

  const prevRoomId = usePrevValue(props.roomId);

  if (roomChatStore.current === null || props.roomId !== prevRoomId) {
    roomChatStore.current = createRoomChatStore({
      roomId: props.roomId,
    });
  }

  return (
    <RoomChatStoreContext.Provider value={roomChatStore.current}>
      <RoomChat {...props} />
    </RoomChatStoreContext.Provider>
  );
};

export default RoomChatWrapper;
