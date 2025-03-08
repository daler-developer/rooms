import { NetworkStatus } from "@apollo/client";
import { InvitationsListQuery } from "@/__generated__/graphql.ts";
import InvitationsListItem from "./InvitationsListItem.tsx";
import useNewInvitationSub from "../gql/useNewInvitationSub.ts";
import useGetInvitationsListQuery from "../gql/useGetInvitationsListQuery.ts";
import { Empty } from "@/shared/ui";

const InvitationsList = () => {
  const queries = {
    invitationsList: useGetInvitationsListQuery(),
  };

  useNewInvitationSub();

  if (queries.invitationsList.networkStatus === NetworkStatus.loading) {
    return "loading";
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.error) {
    return "error";
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.ready && queries.invitationsList.data!.me.invitations.length === 0) {
    return (
      <div>
        <Empty title="No invitations" />
      </div>
    );
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.ready && queries.invitationsList.data!.me.invitations.length > 0) {
    const getKey = (invitation: ItemType<InvitationsListQuery["me"]["invitations"]>) => {
      return `${invitation.roomId}-${invitation.userId}`;
    };

    return (
      <div className="flex flex-col gap-y-2">
        {queries.invitationsList.data!.me.invitations.map((invitation) => (
          <InvitationsListItem key={getKey(invitation)} invitation={invitation} />
        ))}
      </div>
    );
  }
};

export default InvitationsList;
