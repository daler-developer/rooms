import { createContext, useContext } from "react";

type ContextValue = {
  roomId: number;
};

const RoomChatIdContext = createContext<ContextValue>({ roomId: -1 });

const useRoomId = () => {
  return useContext(RoomChatIdContext).roomId;
};

export { RoomChatIdContext, useRoomId };
