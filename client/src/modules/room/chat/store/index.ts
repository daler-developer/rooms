import { ScrollHandle } from "@/shared/ui";
import { createZustandStoreFactory } from "@/shared/lib/zustand";

export type TemporaryMessage = {
  id: string;
  text: string;
  sentAt: string;
  imageUrls: string[];
};

export type TemporaryScheduledMessage = {
  id: string;
  text: string;
  scheduledAt: string;
  imageUrls: string[];
};

type Tab = "main" | "scheduled-messages";

type RoomChatState = {
  roomId: number;
  setRoomId: (roomId: number) => void;

  messageTextInputEl: HTMLInputElement | null;
  setMessageTextInputEl: (el: HTMLInputElement | null) => void;

  hiddenSubmitButton: HTMLInputElement | null;
  setHiddenSubmitButton: (to: HTMLInputElement | null) => void;

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
  setSelectedMessages: (selectedMessages: Array<number | string>) => void;

  clearSelectedMessages: () => void;
  addSelectedMessage: (messageId: number) => void;
  removeSelectedMessage: (messageId: number) => void;
  removeSelectedMessages: (messageIds: number[]) => void;

  selectedScheduledMessages: number[];
  setSelectedScheduledMessages: (list: Array<number | string>) => void;

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

const { useStore: useRoomChatStore, withStore: withRoomChatStore } = createZustandStoreFactory<RoomChatState>((set) => ({
  hiddenSubmitButton: null,
  setHiddenSubmitButton(to) {
    set({
      hiddenSubmitButton: to,
    });
  },

  temporaryScheduledMessages: [],
  addTemporaryScheduledMessage(m) {
    set((state) => ({
      temporaryScheduledMessages: [...state.temporaryScheduledMessages, m],
    }));
  },
  removeTemporaryScheduledMessage(id) {
    set((state) => ({
      temporaryScheduledMessages: state.temporaryScheduledMessages.filter((m) => m.id !== id),
    }));
  },
  clearTemporaryScheduledMessages() {
    set({
      temporaryScheduledMessages: [],
    });
  },

  messageTextInputEl: null,
  setMessageTextInputEl(to) {
    set({
      messageTextInputEl: to,
    });
  },

  roomId: -1,

  temporaryMessages: [],

  selectedMessages: [],
  setSelectedMessages(to) {
    set({
      selectedMessages: to,
    });
  },

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
  removeTemporaryMessage(id) {
    set((state) => ({
      temporaryMessages: state.temporaryMessages.filter((m) => m.id !== id),
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
  setSelectedScheduledMessages(list) {
    set({
      selectedScheduledMessages: list,
    });
  },

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
