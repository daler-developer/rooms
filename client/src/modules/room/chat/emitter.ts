import { createEmitter } from "@/lib/emitter";

type Events = {
  ROOM_LEAVE: void;
};

const { withEmitter: withRoomChatEmitter, useEmitter: useRoomChatEmitter } = createEmitter<Events>();

export { withRoomChatEmitter, useRoomChatEmitter };
