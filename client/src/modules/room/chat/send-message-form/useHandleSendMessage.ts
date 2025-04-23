import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { SendMessageInput, Room } from "@/__generated__/graphql";
import { useCustomMutation } from "@/shared/lib/graphql";
import { SEND_MESSAGE_MUTATION } from "../gql/tags";
import useGetRoomQuery from "../gql/useGetRoomQuery";
import { FormFields } from "./types";
import { useRoomChatStore, TemporaryMessage } from "../store";
import { useRoomChatEmitter } from "../emitter";
import { useRoomId } from "../context";
import useNotifyTypingStopMutation from "../gql/useNotifyTypingStopMutation";

const useHandleSendMessage = () => {
  const roomId = useRoomId();

  const roomChatStore = useRoomChatStore();

  const emitter = useRoomChatEmitter();

  const queries = {
    room: useGetRoomQuery(),
  };

  const mutations = {
    notifyTypingStop: useNotifyTypingStopMutation(),
    sendMessage: useCustomMutation(SEND_MESSAGE_MUTATION),
  };

  return useCallback(
    (values: FormFields) => {
      mutations.notifyTypingStop.mutate({
        variables: {
          roomId,
        },
      });

      const temporaryMessage: TemporaryMessage = {
        id: uuid(),
        text: values.text,
        sentAt: new Date().toISOString(),
        imageUrls: values.images.map((image) => image.imageUrl!),
      };

      roomChatStore.addTemporaryMessage(temporaryMessage);

      emitter.emit("MESSAGE_INSERTED", {
        senderIsMe: true,
      });

      const input: SendMessageInput = {
        roomId,
        text: values.text,
        imageUrls: values.images.map((image) => image.imageUrl!),
      };

      mutations.sendMessage.mutate({
        variables: {
          input,
        },
        onCompleted() {
          roomChatStore.removeTemporaryMessage(temporaryMessage.id);
        },
        update(cache, { data: mutationData }) {
          if (!mutationData) return;

          const newMessage = mutationData.sendMessage;

          cache.modify<Room>({
            id: cache.identify(queries.room.data!.room),
            fields: {
              messages(prevData, { toReference }) {
                return {
                  data: [toReference(newMessage), ...prevData.data],
                  hasMore: prevData.hasMore,
                };
              },
            },
          });
        },
      });
    },
    [roomId, queries.room.data],
  );
};

export default useHandleSendMessage;
