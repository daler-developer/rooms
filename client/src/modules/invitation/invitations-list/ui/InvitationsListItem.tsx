import { Avatar, Button, useToast } from "@/shared/ui";
import { InvitationsListQuery } from "@/__generated__/graphql.ts";
import useAcceptInvitationMutation from "../gql/useAcceptInvitationMutation.ts";
import useRejectInvitationMutation from "../gql/useRejectInvitationMutation.ts";

type Props = {
  invitation: Flatten<InvitationsListQuery["invitations"]>;
};

const InvitationsListItem = ({ invitation }: Props) => {
  const toast = useToast();

  const mutations = {
    acceptInvitation: useAcceptInvitationMutation(),
    rejectInvitation: useRejectInvitationMutation(),
  };

  const handleAcceptInvitation = async () => {
    toast.success("Invitation accepted");
    await mutations.acceptInvitation.mutate({
      variables: {
        input: {
          roomId: invitation.roomId,
        },
      },
    });
  };

  const handleRejectInvitation = async () => {
    toast.success("Invitation rejected");
    await mutations.rejectInvitation.mutate({
      variables: {
        input: {
          roomId: invitation.roomId,
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 p-[10px] border-b border-b-gray-200">
      <Avatar src={invitation.room.thumbnailUrl} size="md" />

      <div className="font-bold text-xl">{invitation.room.name}</div>

      <div>
        Invited by: {invitation.inviter.firstName} {invitation.inviter.lastName}
      </div>

      <div className="flex items-center gap-2">
        <Button type="button" color="default" isLoading={mutations.acceptInvitation.loading} onClick={handleAcceptInvitation}>
          Accept
        </Button>

        <Button type="button" color="red" isLoading={mutations.rejectInvitation.loading} onClick={handleRejectInvitation}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default InvitationsListItem;
