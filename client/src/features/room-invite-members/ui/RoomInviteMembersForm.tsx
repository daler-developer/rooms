import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Input, Portal } from "@/shared/ui";
import { NetworkStatus, useLazyQuery, useMutation } from "@apollo/client";
import { SEARCH_USERS, INVITE_USERS_TO_ROOM, ROOM_GET_PENDING_INVITATIONS } from "../gql/tags.ts";
import { Popover, Spinner, Scroll } from "@/shared/ui";
import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import { useDebouncedValue } from "@/shared/hooks";
import UserSearchResultCard from "./UserSearchResultCard.tsx";
import InvitedMember from "./InvitedMember.tsx";
import { UsersSelector, type User } from "@/widgets/users-selector";
import useInviteUsersToRoomMutation from "../gql/useInviteUsersToRoomMutation.ts";
import usersSelector from "@/widgets/users-selector/ui/UsersSelector.tsx";
import { useAuth } from "@/modules/auth";
import useGetParticipantsQuery from "../gql/useGetParticipantsQuery.ts";
import useGetInvitedUsersQuery from "../gql/useGetInvitedUsersQuery.ts";

const LIMIT = 7;

type ModeRequest = {
  mode: "request";
  roomId: number;
  onSuccess?: () => void;
};

type ModeCallback = {
  mode: "callback";
  onSelect: (userIds: number[]) => void;
};

type Props = {
  roomId: number;
  onSuccess?: () => void;
  teleportSubmitButtonTo: HTMLElement;
};

const RoomInviteMembersForm = ({ roomId, onSuccess, teleportSubmitButtonTo }: Props) => {
  const { userId } = useAuth();

  const queries = {
    participants: useGetParticipantsQuery(),
    invitedUsers: useGetInvitedUsersQuery(),
  };

  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  const hiddenSubmitButtonEl = useRef<HTMLInputElement>(null!);

  const mutations = {
    inviteUsersToRoom: useInviteUsersToRoomMutation(),
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await mutations.inviteUsersToRoom.mutate({
      variables: {
        roomId,
        invitedUsersIds: usersSelected.map((user) => user.id),
      },
    });

    onSuccess?.();
  };

  return (
    <>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <UsersSelector
          users={usersSelected}
          onSelect={(user) => setUsersSelected((prev) => [...prev, user])}
          onDeselect={(user) => setUsersSelected((prev) => prev.filter((_user) => _user.id !== user.id))}
          userIsSelectable={(user) => {
            const isMe = user.id === userId;
            return !isMe;
          }}
          badgeContent={(user) => {
            const isMe = user.id === userId;
            if (isMe) {
              return <span className="font-medium text-gray-500 text-[15px] italic pr-2">You</span>;
            }
            const isAlreadyInvited = true;
            if (isAlreadyInvited) {
              return <span className="font-medium text-gray-500 text-[15px] italic pr-2">Already invited</span>;
            }
            return null;
          }}
        />

        <button type="submit">Invite</button>
      </form>
    </>
  );
};

export default RoomInviteMembersForm;
