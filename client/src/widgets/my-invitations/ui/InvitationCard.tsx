import { Button } from "@/shared/ui";
import { GetMyInvitationsQuery } from "@/__generated__/graphql.ts";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVITATION, GET_MY_INVITATIONS, REJECT_INVITATION } from "../gql/tags.ts";
import { gql } from "@/__generated__";

type Props = {
  invitation: ItemType<GetMyInvitationsQuery["me"]["invitations"]>;
};

const InvitationCard = ({ invitation }: Props) => {
  const [acceptInvitation, { loading: isAcceptingInvitation }] = useMutation(ACCEPT_INVITATION, {
    update(cache) {
      const oldData = cache.readQuery({
        query: GET_MY_INVITATIONS,
      })!;

      cache.writeQuery({
        query: GET_MY_INVITATIONS,
        data: {
          me: {
            id: oldData.me.id,
            __typename: oldData.me.__typename,
            invitations: oldData.me.invitations.filter((item) => item.userId !== invitation.userId || item.roomId !== invitation.roomId),
          },
        },
      });
    },
  });

  const [rejectInvitation, { loading: isRejectingInvitation }] = useMutation(REJECT_INVITATION, {
    update(cache) {
      const oldData = cache.readQuery({
        query: GET_MY_INVITATIONS,
      })!;

      cache.writeQuery({
        query: GET_MY_INVITATIONS,
        data: {
          me: {
            id: oldData.me.id,
            __typename: oldData.me.__typename,
            invitations: oldData.me.invitations.filter((item) => item.userId !== invitation.userId || item.roomId !== invitation.roomId),
          },
        },
      });
    },
  });

  const handleAcceptInvitation = () => {
    acceptInvitation({
      variables: {
        input: {
          roomId: invitation.roomId,
        },
      },
    });
  };

  const handleRejetInviation = () => {
    rejectInvitation({
      variables: {
        input: {
          roomId: invitation.roomId,
        },
      },
    });
  };

  return (
    <div className="border border-gray-300 p-[10px]">
      <div>
        Room name:
        {invitation.room.name}
      </div>

      <div>Inviter email: {invitation.inviter.email}</div>

      <div className="flex items-center gap-2">
        <Button type="button" color="default" isLoading={isAcceptingInvitation} onClick={handleAcceptInvitation}>
          Accept
        </Button>

        <Button type="button" color="red" isLoading={isRejectingInvitation} onClick={handleRejetInviation}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default InvitationCard;
