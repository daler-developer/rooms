import { useApolloClient, useMutation } from "@apollo/client";
import { DELETE_MESSAGES } from "./tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { DeleteMessagesMutationVariables } from "@/__generated__/graphql.ts";
import { GET_ROOM } from "../gql/tags.ts";
import { gql } from "@/__generated__";

const useDeleteMessagesMutation = () => {
  const { roomId } = useRoomChatStore();

  const apolloClient = useApolloClient();

  const [mutate, data] = useMutation(DELETE_MESSAGES);

  return [
    (variables: DeleteMessagesMutationVariables) => {
      // const { room } = apolloClient.cache.readQuery({
      //   query: GET_ROOM,
      //   variables: {
      //     roomId: variables.roomId,
      //     messagesOffset: 0,
      //     scheduledMessagesOffset: 0,
      //   },
      // })!;

      apolloClient.cache.modify({
        id: apolloClient.cache.identify({ __typename: "Room", id: variables.roomId }),
        fields: {
          messages(prevData, { readField }) {
            return {
              ...prevData,
              data: prevData.data.filter((message) => {
                return !variables.messageIds.includes(readField("id", message)!);
              }),
            };
          },
          scheduledMessages(prevData, { readField }) {
            return {
              ...prevData,
              data: prevData.data.filter((message) => {
                return !variables.messageIds.includes(readField("id", message)!);
              }),
            };
          },
          // lastMessage() {
          //   return room.messages.data.find((message) => !variables.messageIds.includes(message.id)) || null;
          // },
        },
      });

      return mutate({
        variables,
      });
    },
    data,
  ] as const;
};

export default useDeleteMessagesMutation;
