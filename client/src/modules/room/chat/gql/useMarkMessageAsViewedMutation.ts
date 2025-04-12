import { useApolloClient } from "@apollo/client";
import { useCustomMutation } from "@/shared/lib/graphql";
import { RoomChatMarkMessageAsViewedMutationVariables, Message } from "@/__generated__/graphql";
import { MARK_MESSAGE_AS_VIEWED } from "./tags";

const useMarkMessageAsViewedMutation = () => {
  const apolloClient = useApolloClient();

  const mutation = useCustomMutation(MARK_MESSAGE_AS_VIEWED);

  return {
    ...mutation,
    mutate(variables: RoomChatMarkMessageAsViewedMutationVariables) {
      apolloClient.cache.modify<Message>({
        id: apolloClient.cache.identify({ __typename: "Message", id: variables.messageId }),
        fields: {
          isViewedByMe() {
            return true;
          },
          viewsCount(prevCount) {
            return prevCount + 1;
          },
        },
      });
      return mutation.mutate({ variables });
    },
  };
};

export default useMarkMessageAsViewedMutation;
