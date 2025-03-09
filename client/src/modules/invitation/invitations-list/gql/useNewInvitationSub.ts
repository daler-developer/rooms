import { useSubscription } from "@apollo/client";
import { SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "./tags";
import { Query } from "@/__generated__/graphql";

const useNewInvitationSub = () => {
  return useSubscription(SUBSCRIBE_TO_ME_INVITED_TO_ROOM, {
    onData({ client, data }) {
      client.cache.modify<Query>({
        id: "ROOT_QUERY",
        fields: {
          invitations(prevInvitations, { toReference }) {
            const newInvitationRef = toReference(data.data!.newInvitation);
            return [...prevInvitations, newInvitationRef];
          },
        },
      });
    },
  });
};

export default useNewInvitationSub;
