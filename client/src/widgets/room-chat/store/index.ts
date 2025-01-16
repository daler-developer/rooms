import { create } from "zustand";
import { GetRoomQuery } from "@/__generated__/graphql.ts";
import { ScrollHandle } from "@/shared/ui";

export type TemporaryMessage = {
  temporaryId: string;
  text: Flatten<GetRoomQuery["room"]["messages"]["data"]>["text"];
};

type RoomChatState = {
  text: string;
  setText: (value: string) => void;
  roomId: number;
  temporaryMessages: Array<TemporaryMessage>;
  addTemporaryMessage: (m: TemporaryMessage) => void;
  removeTemporaryMessage: (temporaryId: string) => void;
  images: Array<{
    key: string;
    fileObject: File;
    imageUrl: string | null;
    isLoading: boolean;
  }>;
  selectedMessages: number[];
  messagesListScrollHandler: ScrollHandle | null;
  setMessagesListScrollHandler: (val: ScrollHandle | null) => void;
  addImage: (key: string, file: File) => void;
  removeImage: (key: string) => void;
  removeAllImages: () => void;
  setImageUrl: (key: string, imageUrl: string) => void;
  setImageIsLoading: (key: string, isLoading: boolean) => void;
  setRoomId: (roomId: number) => void;
  messagesListEl: HTMLDivElement | null;
  setMessagesListEl: (to: HTMLDivElement | null) => void;
  clearSelectedMessages: () => void;
  addSelectedMessage: (messageId: number) => void;
  removeSelectedMessage: (messageId: number) => void;

  messagesOffset: number;
  setMessagesOffset: (to: number) => void;

  scheduledMessagesOffset: number;
  setScheduledMessagesOffset: (to: number) => void;

  showScheduledMessages: boolean;
  setShowScheduledMessages: (showScheduledMessages: boolean) => void;

  messagesListScrollableEl: HTMLElement | null;
  setMessagesListScrollableEl: (messagesListScrollableEl: HTMLElement | null) => void;
};

const createRoomChatStore = (initialValues: Pick<RoomChatState, "roomId">) => {
  return create<RoomChatState>((set) => ({
    text: "",
    roomId: initialValues.roomId,
    images: [],
    temporaryMessages: [],
    selectedMessages: [],
    messagesListEl: null,
    messagesListScrollHandler: null,

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

    showScheduledMessages: false,
    setShowScheduledMessages: (to) => {
      set(() => ({
        showScheduledMessages: to,
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
    setText(value) {
      set({
        text: value,
      });
    },
    addImage(key, file) {
      set((state) => {
        return {
          images: [
            ...state.images,
            {
              key,
              fileObject: file,
              imageUrl: null,
              isLoading: false,
            },
          ],
        };
      });
    },
    removeImage(key) {
      set((state) => {
        return {
          images: state.images.filter((image) => image.key !== key),
        };
      });
    },
    removeAllImages() {
      set({
        images: [],
      });
    },
    setImageUrl(key, imageUrl) {
      set((state) => {
        return {
          images: state.images.map((image) => {
            if (image.key === key) {
              return {
                ...image,
                imageUrl,
              };
            }

            return image;
          }),
        };
      });
    },
    setImageIsLoading(key, isLoading) {
      set((state) => {
        return {
          images: state.images.map((image) => {
            if (image.key === key) {
              return {
                ...image,
                isLoading,
              };
            }

            return image;
          }),
        };
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
  }));
};

export default createRoomChatStore;
