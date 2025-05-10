import { useSubscription } from "@apollo/client";
import { INVITATIONS_COUNT_UPDATED_SUB } from "./tags";
import { type Query } from "@/__generated__/graphql.ts";

const useInvitationsCountUpdatedSub = () => {
  return useSubscription(INVITATIONS_COUNT_UPDATED_SUB, {
    onData({ client, data }) {
      if (!data.data) return;

      client.cache.modify<Query>({
        id: "ROOT_QUERY",
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
