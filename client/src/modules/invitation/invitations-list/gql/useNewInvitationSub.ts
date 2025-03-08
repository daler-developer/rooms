import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "./tags";
import { User } from "@/__generated__/graphql";
import { useAuth } from "@/modules/auth";

const useNewInvitationSub = () => {
  const { userId } = useAuth();

  return useSubscription(SUBSCRIBE_TO_ME_INVITED_TO_ROOM, {
    onData({ client, data }) {
      client.cache.modify<User>({
        id: client.cache.identify({
          __typename: "User",
          id: userId,
        }),
        fields: {
          invitations(prevInvitations) {
            return prevInvitations;
          },
        },
      });
    },
  });
};

export default useNewInvitationSub;
