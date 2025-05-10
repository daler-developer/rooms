import { useSubscription } from "@apollo/client";
import { INVITATIONS_COUNT_UPDATED_SUB } from "./tags";
import { User } from "@/__generated__/graphql.ts";
import { useAuth } from "@/modules/auth";

const useInvitationsCountUpdatedSub = () => {
  const { userId } = useAuth();

  return useSubscription(INVITATIONS_COUNT_UPDATED_SUB, {
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<User>({
        id: client.cache.identify({ __typename: "User", id: userId }),
        fields: {
          invitationsCount() {
            return data.data!.invitationCountUpdated;
          },
        },
      });
    },
  });
};

export default useInvitationsCountUpdatedSub;
