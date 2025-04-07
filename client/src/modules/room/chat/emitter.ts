import { createEmitter } from "@/lib/emitter";

type Events = {
  ROOM_LEAVE: void;
  EXCLUDED_FROM_ROOM: void;
  MESSAGE_INSERTED: {
    senderIsMe: boolean;
  };
};

type EventCallback<K extends keyof Events> = (payload: Events[K]) => void;

const { withEmitter: withRoomChatEmitter, useEmitter: useRoomChatEmitter } = createEmitter<Events>();

export { withRoomChatEmitter, useRoomChatEmitter, type EventCallback };
