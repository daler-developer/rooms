import { create } from "zustand";
import { RoomChatGetMessagesQuery, GetRoomQuery } from "@/__generated__/graphql.ts";
import { ScrollHandle } from "@/shared/ui";
import { createZustandStoreFactory } from "@/shared/lib/zustand";
import { Step } from "@/modules/room/create/store.ts";

export type TemporaryMessage = {
  temporaryId: string;
  text: Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>["text"];
  sentAt: Flatten<RoomChatGetMessagesQuery["room"]["messages"]["data"]>["sentAt"];
  imageUrls: string[];
  isTemporary: true;
};

export type TemporaryScheduledMessage = {
  temporaryId: string;
  text: Flatten<GetRoomQuery["room"]["scheduledMessages"]["data"]>["text"];
  scheduledAt: Flatten<GetRoomQuery["room"]["scheduledMessages"]["data"]>["scheduledAt"];
  isTemporary: true;
};

type Tab = "main" | "scheduled-messages";

type RoomChatState = {
  roomId: number;
  setRoomId: (roomId: number) => void;

  temporaryMessages: Array<TemporaryMessage>;
  addTemporaryMessage: (m: TemporaryMessage) => void;
  removeTemporaryMessage: (temporaryId: string) => void;

  temporaryScheduledMessages: TemporaryScheduledMessage[];
  addTemporaryScheduledMessage: (m: TemporaryScheduledMessage) => void;
  removeTemporaryScheduledMessage: (temporaryId: string) => void;
  clearTemporaryScheduledMessages: () => void;

  messagesListScrollHandler: ScrollHandle | null;
  setMessagesListScrollHandler: (val: ScrollHandle | null) => void;

  messagesListEl: HTMLDivElement | null;
  setMessagesListEl: (to: HTMLDivElement | null) => void;

  selectedMessages: number[];
  clearSelectedMessages: () => void;
  addSelectedMessage: (messageId: number) => void;
  removeSelectedMessage: (messageId: number) => void;
  removeSelectedMessages: (messageIds: number[]) => void;

  selectedScheduledMessages: number[];
  clearScheduledSelectedMessages: () => void;
  addSelectedScheduledMessage: (messageId: number) => void;
  removeSelectedScheduledMessages: (messageIds: number[]) => void;

  messagesOffset: number;
  setMessagesOffset: (to: number) => void;

  scheduledMessagesOffset: number;
  setScheduledMessagesOffset: (to: number) => void;

  messagesListScrollableEl: HTMLElement | null;
  setMessagesListScrollableEl: (messagesListScrollableEl: HTMLElement | null) => void;

  tab: "main" | "scheduled-messages";
  setTab: (to: Tab) => void;
};

const createRoomChatStore = (initialValues: Pick<RoomChatState, "roomId">) => {
  return create<RoomChatState>((set) => ({
    temporaryScheduledMessages: [],
    addTemporaryScheduledMessage(m) {
      set((state) => ({
        temporaryScheduledMessages: [...state.temporaryScheduledMessages, m],
      }));
    },
    removeTemporaryScheduledMessage(temporaryId) {
      set((state) => ({
        temporaryScheduledMessages: state.temporaryScheduledMessages.filter((m) => m.temporaryId !== temporaryId),
      }));
    },
    clearTemporaryScheduledMessages() {
      set({
        temporaryScheduledMessages: [],
      });
    },

    roomId: initialValues.roomId,

    temporaryMessages: [],
    selectedMessages: [],
    messagesListEl: null,
    messagesListScrollHandler: null,

    tab: "main",
    setTab(to) {
      set({
        tab: to,
      });
    },

    messagesListScrollableEl: null,
    setMessagesListScrollableEl(to) {
      set(() => ({
        messagesListScrollableEl: to,
      }));
    },

    messagesOffset: 0,
    setMessagesOffset(to) {
      set(() => ({
        messagesOffset: to,
      }));
    },

    scheduledMessagesOffset: 0,
    setScheduledMessagesOffset(to) {
      set(() => ({
        scheduledMessagesOffset: to,
      }));
    },

    addTemporaryMessage(temporaryMessage) {
      set((state) => ({
        temporaryMessages: [...state.temporaryMessages, temporaryMessage],
      }));
    },
    removeTemporaryMessage(temporaryId) {
      set((state) => ({
        temporaryMessages: state.temporaryMessages.filter((m) => m.temporaryId !== temporaryId),
      }));
    },
    setMessagesListEl(el) {
      set({
        messagesListEl: el,
      });
    },
    setMessagesListScrollHandler(val) {
      set({
        messagesListScrollHandler: val,
      });
    },

    setRoomId: (roomId) => set({ roomId }),

    clearSelectedMessages() {
      set({
        selectedMessages: [],
      });
    },
    addSelectedMessage(messageId) {
      set((state) => {
        return {
          selectedMessages: [...state.selectedMessages, messageId],
        };
      });
    },
    removeSelectedMessage(messageId) {
      set((state) => {
        return {
          selectedMessages: state.selectedMessages.filter((id) => id !== messageId),
        };
      });
    },
    removeSelectedMessages(messageIds) {
      set((state) => {
        return {
          selectedMessages: state.selectedMessages.filter((id) => !messageIds.includes(id)),
        };
      });
    },

    selectedScheduledMessages: [],
    clearScheduledSelectedMessages() {
      set({
        selectedScheduledMessages: [],
      });
    },
    addSelectedScheduledMessage(messageId) {
      set((state) => ({
        selectedScheduledMessages: [...state.selectedScheduledMessages, messageId],
      }));
    },
    removeSelectedScheduledMessages(messageIds) {
      set((state) => ({
        selectedScheduledMessages: state.selectedScheduledMessages.filter((_messageId) => !messageIds.includes(_messageId)),
      }));
    },
  }));
};

export default createRoomChatStore;

const { useStore: useRoomChatStore, withStore: withRoomChatStore } = createZustandStoreFactory<RoomChatState>((set) => ({
  temporaryScheduledMessages: [],
  addTemporaryScheduledMessage(m) {
    set((state) => ({
      temporaryScheduledMessages: [...state.temporaryScheduledMessages, m],
    }));
  },
  removeTemporaryScheduledMessage(temporaryId) {
    set((state) => ({
      temporaryScheduledMessages: state.temporaryScheduledMessages.filter((m) => m.temporaryId !== temporaryId),
    }));
  },
  clearTemporaryScheduledMessages() {
    set({
      temporaryScheduledMessages: [],
    });
  },

  roomId: -1,

  temporaryMessages: [],
  selectedMessages: [],
  messagesListEl: null,
  messagesListScrollHandler: null,

  tab: "main",
  setTab(to) {
    set({
      tab: to,
    });
  },

  messagesListScrollableEl: null,
  setMessagesListScrollableEl(to) {
    set(() => ({
      messagesListScrollableEl: to,
    }));
  },

  messagesOffset: 0,
  setMessagesOffset(to) {
    set(() => ({
      messagesOffset: to,
    }));
  },

  scheduledMessagesOffset: 0,
  setScheduledMessagesOffset(to) {
    set(() => ({
      scheduledMessagesOffset: to,
    }));
  },

  addTemporaryMessage(temporaryMessage) {
    set((state) => ({
      temporaryMessages: [...state.temporaryMessages, temporaryMessage],
    }));
  },
  removeTemporaryMessage(temporaryId) {
    set((state) => ({
      temporaryMessages: state.temporaryMessages.filter((m) => m.temporaryId !== temporaryId),
    }));
  },
  setMessagesListEl(el) {
    set({
      messagesListEl: el,
    });
  },
  setMessagesListScrollHandler(val) {
    set({
      messagesListScrollHandler: val,
    });
  },

  setRoomId: (roomId) => set({ roomId }),

  clearSelectedMessages() {
    set({
      selectedMessages: [],
    });
  },
  addSelectedMessage(messageId) {
    set((state) => {
      return {
        selectedMessages: [...state.selectedMessages, messageId],
      };
    });
  },
  removeSelectedMessage(messageId) {
    set((state) => {
      return {
        selectedMessages: state.selectedMessages.filter((id) => id !== messageId),
      };
    });
  },
  removeSelectedMessages(messageIds) {
    set((state) => {
      return {
        selectedMessages: state.selectedMessages.filter((id) => !messageIds.includes(id)),
      };
    });
  },

  selectedScheduledMessages: [],
  clearScheduledSelectedMessages() {
    set({
      selectedScheduledMessages: [],
    });
  },
  addSelectedScheduledMessage(messageId) {
    set((state) => ({
      selectedScheduledMessages: [...state.selectedScheduledMessages, messageId],
    }));
  },
  removeSelectedScheduledMessages(messageIds) {
    set((state) => ({
      selectedScheduledMessages: state.selectedScheduledMessages.filter((_messageId) => !messageIds.includes(_messageId)),
    }));
  },
}));

export { useRoomChatStore, withRoomChatStore };
