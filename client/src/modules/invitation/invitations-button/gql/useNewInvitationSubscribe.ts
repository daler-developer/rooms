import { useSubscription } from "@apollo/client";
import { User } from "@/__generated__/graphql";
import { NEW_INVITATION_SUB } from "./tags";
import { useAuth } from "@/modules/auth";

const useNewInvitationSubscribe = () => {
  const { userId } = useAuth();

  return useSubscription(NEW_INVITATION_SUB, {
    onData({ client }) {
      client.cache.modify<User>({
        id: client.cache.identify({ __typename: "User", id: userId }),
        fields: {
          invitationsCount(prevInvitationsCount) {
            return prevInvitationsCount + 1;
          },
        },
      });
    },
  });
};

export default useNewInvitationSubscribe;
