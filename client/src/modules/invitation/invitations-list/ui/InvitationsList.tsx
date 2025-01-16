import { useQuery, useSubscription } from "@apollo/client";
import { InvitationsListQuery } from "@/__generated__/graphql.ts";
import { GET_MY_INVITATIONS, SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "../gql/tags.ts";
import InvitationsListItem from "./InvitationsListItem.tsx";
import { Empty } from "@/shared/ui";

const InvitationsList = () => {
  const myInvitationsQuery = useQuery(GET_MY_INVITATIONS);

  useSubscription(SUBSCRIBE_TO_ME_INVITED_TO_ROOM, {
    onData({ client, data }) {
      const oldData = client.cache.readQuery({
        query: GET_MY_INVITATIONS,
      })!;

      client.cache.writeQuery({
        query: GET_MY_INVITATIONS,
        data: {
          me: {
            id: oldData.me.id,
            __typename: oldData.me.__typename,
            invitations: [...oldData.me.invitations, data.data!.meIsInvitedToRoom.invitation],
          },
        },
      });
    },
  });

  if (myInvitationsQuery.loading) {
    return "loading";
  }

  if (myInvitationsQuery.error) {
    return "error";
  }

  const getKey = (invitation: ItemType<InvitationsListQuery["me"]["invitations"]>) => {
    return `${invitation.roomId}-${invitation.userId}`;
  };

  if (myInvitationsQuery.data!.me.invitations.length === 0) {
    return (
      <div>
        <Empty title="No invitations" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      {myInvitationsQuery.data!.me.invitations.map((invitation) => (
        <InvitationsListItem key={getKey(invitation)} invitation={invitation} />
      ))}
    </div>
  );
};

export default InvitationsList;
