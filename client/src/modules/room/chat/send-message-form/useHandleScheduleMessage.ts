import { useCallback } from "react";
import { flushSync } from "react-dom";
import { v4 as uuid } from "uuid";
import { useCustomMutation } from "@/shared/lib/graphql";
import { SCHEDULE_MESSAGE_MUTATION } from "../gql/tags";
import useGetRoomQuery from "../gql/useGetRoomQuery";
import { FormFields } from "./types";
import { useRoomChatStore, TemporaryMessage, TemporaryScheduledMessage } from "../store";
import { useRoomId } from "../context";

const useHandleSendMessage = () => {
  const roomId = useRoomId();

  const { addTemporaryScheduledMessage, removeTemporaryScheduledMessage } = useRoomChatStore();

  const queries = {
    room: useGetRoomQuery(),
  };

  const mutations = {
    scheduleMessage: useCustomMutation(SCHEDULE_MESSAGE_MUTATION),
  };

  return useCallback(
    (values: FormFields) => {
      const temporaryScheduledMessage: TemporaryScheduledMessage = {
        temporaryId: uuid(),
        text: values.text,
        scheduledAt: values.scheduleAt,
        isTemporary: true,
      };

      flushSync(() => {
        addTemporaryScheduledMessage(temporaryScheduledMessage);
      });

      // emitter.emit("SCHEDULED_MESSAGE_INSERTED");

      // apolloClient.cache.modify({
      //   id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
      //   fields: {
      //     myScheduledMessagesCount(prevCount: number) {
      //       return prevCount + 1;
      //     },
      //   },
      // });

      mutations.scheduleMessage.mutate({
        variables: {
          input: {
            roomId,
            text: values.text,
            scheduleAt: values.scheduleAt,
            imageUrls: [],
          },
        },
        onCompleted() {
          removeTemporaryScheduledMessage(temporaryScheduledMessage.temporaryId);
        },
        update(cache, { data }) {
          cache.modify({
            id: cache.identify({ __typename: "Room", id: roomId }),
            fields: {
              scheduledMessages(prevData) {
                return {
                  ...prevData,
                  data: [...prevData.data, data!.scheduleMessage],
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
