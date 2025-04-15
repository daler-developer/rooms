import { useApolloClient } from "@apollo/client";
import { useCustomMutation } from "@/shared/lib/graphql";
import { Room, RoomChatDeleteMessagesMutationVariables } from "@/__generated__/graphql.ts";
import { DELETE_MESSAGES } from "./tags.ts";

const useDeleteMessagesMutation = () => {
  const apolloClient = useApolloClient();

  const mutation = useCustomMutation(DELETE_MESSAGES);

  return {
    ...mutation,
    async mutate(variables: RoomChatDeleteMessagesMutationVariables) {
      apolloClient.cache.modify<Room>({
        id: apolloClient.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          messages(prevMessages, { readField }) {
            return {
              ...prevMessages,
              data: prevMessages.data.filter((message) => {
                const messageId = readField("id", message);
                return !variables.messageIds.includes(messageId);
              }),
            };
          },
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

export default useDeleteMessagesMutation;
