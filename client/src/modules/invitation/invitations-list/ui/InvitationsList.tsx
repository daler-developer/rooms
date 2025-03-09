import { Empty } from "@/shared/ui";
import { NetworkStatus } from "@apollo/client";
import { InvitationsListQuery } from "@/__generated__/graphql.ts";
import InvitationsListItem from "./InvitationsListItem.tsx";
import useNewInvitationSub from "../gql/useNewInvitationSub.ts";
import useGetInvitationsListQuery from "../gql/useGetInvitationsListQuery.ts";
import InvitationsListSkeletons from "./InvitationsListSkeletons.tsx";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";

const InvitationsList = () => {
  const queries = {
    invitationsList: useGetInvitationsListQuery(),
  };

  useNewInvitationSub();

  if (queries.invitationsList.networkStatus === NetworkStatus.loading) {
    return <InvitationsListSkeletons />;
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.error) {
    return (
      <div>
        <ApolloErrorDisplay error={queries.invitationsList.error} />
      </div>
    );
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.ready && queries.invitationsList.data!.invitations.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Empty title="No invitations" />
      </div>
    );
  }

  if (queries.invitationsList.networkStatus === NetworkStatus.ready && queries.invitationsList.data!.invitations.length > 0) {
    const getKey = (invitation: ItemType<InvitationsListQuery["invitations"]>) => {
      return `${invitation.roomId}-${invitation.userId}`;
    };

    return (
      <div className="flex flex-col gap-y-2">
        {queries.invitationsList.data!.invitations.map((invitation) => (
          <InvitationsListItem key={getKey(invitation)} invitation={invitation} />
        ))}
      </div>
    );
  }
};

export default InvitationsList;
