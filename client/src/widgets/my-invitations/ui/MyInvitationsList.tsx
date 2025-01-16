import { useQuery, useSubscription } from "@apollo/client";
import { GetMyInvitationsQuery } from "@/__generated__/graphql.ts";
import { GET_MY_INVITATIONS, SUBSCRIBE_TO_ME_INVITED_TO_ROOM } from "../gql/tags.ts";
import InvitationCard from "./InvitationCard.tsx";
import { Scroll } from "@/shared/ui";

const MyInvitationsList = () => {
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

  const getKey = (invitation: ItemType<GetMyInvitationsQuery["me"]["invitations"]>) => {
    return `${invitation.roomId}-${invitation.userId}`;
  };

  return (
    <Scroll height={1000}>
      <div className="flex flex-col gap-y-2">
        {myInvitationsQuery.data!.me.invitations.map((invitation) => (
          <InvitationCard key={getKey(invitation)} invitation={invitation} />
        ))}
      </div>
    </Scroll>
  );
};

export default MyInvitationsList;
