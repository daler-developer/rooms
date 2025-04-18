import { useApolloClient } from "@apollo/client";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Room, RoomChatDeleteScheduledMessagesMutationVariables } from "@/__generated__/graphql.ts";
import { DELETE_SCHEDULED_MESSAGES } from "./tags.ts";

const useDeleteScheduledMessagesMutation = () => {
  const apolloClient = useApolloClient();

  const mutation = useCustomMutation(DELETE_SCHEDULED_MESSAGES);

  return {
    ...mutation,
    async mutate({ roomId, variables }: { roomId: number; variables: RoomChatDeleteScheduledMessagesMutationVariables }) {
      apolloClient.cache.modify<Room>({
        id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          scheduledMessages(prevMessages, { readField }) {
            return {
              ...prevMessages,
              data: prevMessages.data.filter((message) => {
                const messageId = readField("id", message);
                return !variables.messageIds.includes(messageId);
              }),
            };
          },
        },
      });
      return mutation.mutate({ variables });
    },
  };
};

export default useDeleteScheduledMessagesMutation;
