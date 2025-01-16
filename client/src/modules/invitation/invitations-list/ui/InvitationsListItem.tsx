import { Avatar, Button } from "@/shared/ui";
import { InvitationsListQuery } from "@/__generated__/graphql.ts";
import { useMutation } from "@apollo/client";
import { ACCEPT_INVITATION, GET_MY_INVITATIONS, REJECT_INVITATION } from "../gql/tags.ts";
import emitter from "../../../../global/event-emitter/emitter.ts";

type Props = {
  invitation: ItemType<InvitationsListQuery["me"]["invitations"]>;
};

const InvitationsListItem = ({ invitation }: Props) => {
  const [acceptInvitation, { loading: isAcceptingInvitation }] = useMutation(ACCEPT_INVITATION, {
    update(cache) {
      const oldData = cache.readQuery({
        query: GET_MY_INVITATIONS,
      })!;

      cache.modify({
        id: cache.identify(oldData.me),
        fields: {
          invitationsCount(prev: number | undefined) {
            if (prev) {
              return prev - 1;
            }

            return prev;
          },
          invitations(prevInvitations, { readField }) {
            return prevInvitations.filter((_invitation) => {
              const userId = readField("userId", _invitation);
              const roomId = readField("roomId", _invitation);

              return !(userId === invitation.userId && roomId === invitation.roomId);
            });
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

      cache.modify({
        id: cache.identify(oldData.me),
        fields: {
          invitationsCount(prev: number | undefined) {
            if (prev) {
              return prev - 1;
            }

            return prev;
          },
          invitations(prevInvitations, { readField }) {
            return prevInvitations.filter((_invitation) => {
              const userId = readField("userId", _invitation);
              const roomId = readField("roomId", _invitation);

              return !(userId === invitation.userId && roomId === invitation.roomId);
            });
          },
        },
      });
    },
  });

  const handleAcceptInvitation = () => {
    emitter.emit("INVITATION_ACCEPTED");
    acceptInvitation({
      variables: {
        input: {
          roomId: invitation.roomId,
        },
      },
    });
  };

  const handleRejetInviation = () => {
    emitter.emit("INVITATION_REJECTED");
    rejectInvitation({
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

export default InvitationsListItem;
