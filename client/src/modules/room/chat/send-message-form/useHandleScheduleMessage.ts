import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Room } from "@/__generated__/graphql";
import { SCHEDULE_MESSAGE_MUTATION } from "../gql/tags";
import useGetRoomQuery from "../gql/useGetRoomQuery";
import { FormFields } from "./types";
import { useRoomChatStore, TemporaryScheduledMessage } from "../store";
import { useRoomId } from "../context";
import { useRoomChatEmitter } from "../emitter";
import useNotifyTypingStopMutation from "../gql/useNotifyTypingStopMutation";

const useHandleSendMessage = () => {
  const roomId = useRoomId();
  const emitter = useRoomChatEmitter();
  const apolloClient = useApolloClient();

  const { addTemporaryScheduledMessage, removeTemporaryScheduledMessage } = useRoomChatStore();

  const queries = {
    room: useGetRoomQuery(),
  };

  const mutations = {
    notifyTypingStop: useNotifyTypingStopMutation(),
    scheduleMessage: useCustomMutation(SCHEDULE_MESSAGE_MUTATION),
  };

  return useCallback(
    (values: FormFields) => {
      mutations.notifyTypingStop.mutate({
        variables: {
          roomId,
        },
      });

      const temporaryScheduledMessage: TemporaryScheduledMessage = {
        id: uuid(),
        text: values.text,
        scheduledAt: values.scheduleAt!,
        imageUrls: values.images.map((image) => image.imageUrl!),
      };

      addTemporaryScheduledMessage(temporaryScheduledMessage);

      emitter.emit("SCHEDULED_MESSAGE_INSERTED");

      apolloClient.cache.modify<Room>({
        id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          scheduledMessagesCount(prevCount) {
            return prevCount + 1;
          },
        },
      });

      mutations.scheduleMessage.mutate({
        variables: {
          input: {
            roomId,
            text: values.text,
            scheduleAt: values.scheduleAt!,
            imageUrls: values.images.map((image) => image.imageUrl!),
          },
        },
        onCompleted() {
          removeTemporaryScheduledMessage(temporaryScheduledMessage.id);
        },
        update(cache, { data }) {
          if (!data) return;

          const newMessage = data.scheduleMessage;

          cache.modify<Room>({
            id: cache.identify(queries.room.data!.room),
            fields: {
              scheduledMessages(prevData, { toReference }) {
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
