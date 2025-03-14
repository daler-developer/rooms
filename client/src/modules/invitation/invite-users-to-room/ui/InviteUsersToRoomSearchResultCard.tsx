import { User } from "@/__generated__/graphql.ts";
import { Button } from "@/shared/ui";
import { UserCard } from "@/entities/user";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ROOM_GET_PENDING_INVITATIONS } from "@/features/room-invite-members/gql/tags.ts";
import { useMemo } from "react";

type Props = {
  user: Pick<User, "id" | "profilePictureUrl" | "email">;
  roomId: number;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
};

const InviteUsersToRoomSearchResultCard = ({ user, roomId, isSelected, onSelect, onDeselect }: Props) => {
  const { data: pendingInvitations } = useQuery(ROOM_GET_PENDING_INVITATIONS, {
    variables: {
      roomId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const getActions = () => {
    const result = [];

    const hasPendingInvitation = pendingInvitations!.room.pendingInvitations.find((invitation) => invitation.userId === user.id);

    if (hasPendingInvitation) {
      result.push(<div>Already invited</div>);
    } else if (isSelected) {
      result.push(
        <Button type="button" color="red" size="sm" onClick={() => onDeselect()}>
          Remove
        </Button>,
      );
    } else if (!isSelected) {
      result.push(
        <Button type="button" size="sm" onClick={() => onSelect()}>
          Invite
        </Button>,
      );
    }

    return result;
  };

  return <UserCard as="li" user={user} actions={getActions()} />;
};

export default InviteUsersToRoomSearchResultCard;
