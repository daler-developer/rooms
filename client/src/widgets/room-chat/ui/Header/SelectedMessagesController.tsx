import { useRoomChatStore } from "@/widgets/room-chat/context";
import { Button } from "@/shared/ui";
import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_MESSAGES } from "../../gql/tags.ts";

const SelectedMessagesController = () => {
  const { roomId, selectedMessages, removeSelectedMessage } = useRoomChatStore();

  const [deleteMessages, { loading: isDeletingMessages }] = useMutation(DELETE_MESSAGES);

  const apolloClient = useApolloClient();

  const handleDelete = async () => {
    selectedMessages.forEach((messageId) => {
      apolloClient.cache.evict({
        id: apolloClient.cache.identify({ __typename: "Message", id: messageId }),
      });
      removeSelectedMessage(messageId);
    });
    await deleteMessages({
      variables: {
        roomId,
        messageIds: selectedMessages,
      },
    });
  };

  return (
    <div className="flex items-center justify-between shrink-0 p-2 px-4 bg-shadow-lg bg-white border border-b-gray-300 basis-[70px]">
      <h1 className="text-md font-semibold text-gray-900">Selected: {selectedMessages.length}</h1>
      <Button type="button" color="red" isLoading={isDeletingMessages} onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default SelectedMessagesController;
