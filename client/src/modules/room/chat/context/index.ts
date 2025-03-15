import { createContext, useContext } from "react";
import createRoomChatStore from "@/widgets/room-chat/store";

type ContextValue = {
  roomId: number;
};

const RoomChatStoreContext = createContext<ReturnType<typeof createRoomChatStore>>(null!);
const RoomChatIdContext = createContext<ContextValue>({ roomId: -1 });

const useRoomChatStore = () => {
  return useContext(RoomChatStoreContext)();
};

const useRoomId = () => {
  return useContext(RoomChatIdContext).roomId;
};

export { RoomChatStoreContext, RoomChatIdContext, useRoomChatStore, useRoomId };
