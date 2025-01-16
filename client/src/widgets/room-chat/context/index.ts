import { createContext, useContext } from "react";
import createRoomChatStore from "@/widgets/room-chat/store";

const RoomChatStoreContext = createContext<ReturnType<typeof createRoomChatStore>>(null!);

const useRoomChatStore = () => {
  return useContext(RoomChatStoreContext)();
};

export { RoomChatStoreContext, useRoomChatStore };
