import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Button, Input, Portal } from "@/shared/ui";
import { NetworkStatus, useLazyQuery, useMutation } from "@apollo/client";
import { SEARCH_USERS, INVITE_USERS_TO_ROOM, ROOM_GET_PENDING_INVITATIONS } from "../gql/tags.ts";
import { Popover, Spinner, Scroll } from "@/shared/ui";
import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import { useDebouncedValue } from "@/shared/hooks";
import UserSearchResultCard from "./UserSearchResultCard.tsx";
import InvitedMember from "./InvitedMember.tsx";
import { UsersSelector } from "@/widgets/users-selector";
import useInviteUsersToRoomMutation from "../gql/useInviteUsersToRoomMutation.ts";

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
  const [userIds, setUserIds] = useState<number[]>([]);

  useEffect(() => {
    console.log("userIds", userIds);
  }, [userIds]);

  const hiddenSubmitButtonEl = useRef<HTMLInputElement>(null!);

  const mutations = {
    inviteUsersToRoom: useInviteUsersToRoomMutation(),
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await mutations.inviteUsersToRoom.mutate({
      variables: {
        roomId,
        invitedUsersIds: userIds,
      },
    });

    onSuccess?.();
  };

  return (
    <>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <UsersSelector excludeMe onChange={(userIds) => setUserIds(userIds)} />

        <button type="submit">Invite</button>
      </form>
    </>
  );
};

export default RoomInviteMembersForm;
