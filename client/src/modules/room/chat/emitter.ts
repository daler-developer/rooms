import { createEmitter } from "@/lib/emitter";

type Events = {
  ROOM_LEAVE: void;
  EXCLUDED_FROM_ROOM: void;
  MESSAGE_INSERTED: {
    senderIsMe: boolean;
  };
};

const { withEmitter: withRoomChatEmitter, useEmitter: useRoomChatEmitter } = createEmitter<Events>();

export { withRoomChatEmitter, useRoomChatEmitter };
