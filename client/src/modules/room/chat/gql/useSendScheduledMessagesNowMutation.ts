import { useApolloClient, useMutation } from "@apollo/client";
import { RoomChatSendScheduledMessagesNowMutationVariables, Room } from "@/__generated__/graphql.ts";
import { GET_ROOM, SEND_SCHEDULED_MESSAGES_NOW } from "./tags.ts";
import { useCustomMutation } from "@/shared/lib/graphql";

const useSendScheduledMessagesNowMutation = () => {
  const apolloClient = useApolloClient();

  const mutation = useCustomMutation(SEND_SCHEDULED_MESSAGES_NOW);

  return {
    ...mutation,
    mutate(roomId: number, variables: RoomChatSendScheduledMessagesNowMutationVariables) {
      apolloClient.cache.modify<Room>({
        id: apolloClient.cache.identify({ __typename: "Room", id: roomId }),
        fields: {
          scheduledMessages(prevMessages, { readField }) {
            return {
              ...prevMessages,
              data: prevMessages.data.filter((message) => {
                return !variables.messageIds.includes(readField("id", message));
              }),
            };
          },
        },
      });
      return mutation.mutate({ variables });
    },
  };
};

export default useSendScheduledMessagesNowMutation;
