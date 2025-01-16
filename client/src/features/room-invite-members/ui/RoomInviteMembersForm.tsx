import { SyntheticEvent, useRef, useState } from "react";
import { Button, Input, Portal } from "@/shared/ui";
import { NetworkStatus, useLazyQuery, useMutation } from "@apollo/client";
import { SEARCH_USERS, INVITE_USERS_TO_ROOM, ROOM_GET_PENDING_INVITATIONS } from "../gql/tags.ts";
import { Popover, Spinner, Scroll } from "@/shared/ui";
import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import { useDebouncedValue } from "@/shared/hooks";
import UserSearchResultCard from "./UserSearchResultCard.tsx";
import InvitedMember from "./InvitedMember.tsx";

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
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<Array<Flatten<SearchUsersQuery["searchUsers"]["users"]>>>([]);

  const hiddenSubmitButtonEl = useRef<HTMLInputElement>(null!);

  const debouncedSearchInput = useDebouncedValue(searchInput);

  const [inviteUsers] = useMutation(INVITE_USERS_TO_ROOM);

  const [getRoomPendingInvitations, { loading: isGettingRoomPendingInvitations, refetch }] = useLazyQuery(ROOM_GET_PENDING_INVITATIONS, {
    variables: {
      roomId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [searchUsers, { loading, data, networkStatus, fetchMore, variables }] = useLazyQuery(SEARCH_USERS, {
    variables: {
      input: {
        q: debouncedSearchInput,
        offset: 0,
        limit: LIMIT,
        excludeMe: true,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  const handleScrollToBottom = async () => {
    if (loading) {
      return;
    }

    if (!data!.searchUsers.hasMore) {
      return;
    }

    await fetchMore({
      variables: {
        input: {
          ...variables!.input,
          offset: data!.searchUsers.users.length,
        },
      },
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await inviteUsers({
      variables: {
        roomId,
        invitedUsersIds: selectedUsers.map((user) => user.id),
      },
      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: "Room", id: roomId }),
          fields: {
            pendingInvitationsCount(prev) {
              return prev + 1;
            },
          },
        });
      },
    });

    await refetch();

    onSuccess?.();
  };

  return (
    <>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        {selectedUsers.length > 0 && (
          <div>
            <Scroll className="h-[30px] flex items-start gap-x-1">
              {selectedUsers.map((user) => (
                <InvitedMember key={user.id} user={user} onDelete={() => setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id))} />
              ))}
            </Scroll>
          </div>
        )}

        <div>
          <Popover
            width={"full"}
            trigger={
              <div>
                <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." />
              </div>
            }
            placement="bottom-left"
            offset={5}
            onOpen={() => {
              searchUsers();
              getRoomPendingInvitations();
            }}
          >
            <div className="bg-white shadow-xl border border-gray-300 overflow-hidden rounded-lg">
              {(loading || isGettingRoomPendingInvitations) && !isFetchingMore ? (
                <div className="h-[200px] flex items-center justify-center bg-white shadow-xl">
                  <Spinner />
                </div>
              ) : (
                <Scroll className="h-[200px] rounded-lg bg-white" onScrollToBottom={handleScrollToBottom}>
                  {data && (
                    <div className="p-[5px]">
                      <ul className="flex flex-col gap-2">
                        {data.searchUsers.users.map((user) => (
                          <UserSearchResultCard
                            key={user.id}
                            roomId={roomId}
                            user={user}
                            isSelected={!!selectedUsers.find((selectedUser) => selectedUser.id === user.id)}
                            onSelect={() => setSelectedUsers((prev) => [...prev, user])}
                            onDeselect={() => setSelectedUsers((prev) => prev.filter((selectedUser) => selectedUser.id !== user.id))}
                          />
                        ))}
                      </ul>

                      {loading && (
                        <div className="h-[60px] flex items-center justify-center">
                          <Spinner size="md" />
                        </div>
                      )}
                    </div>
                  )}
                </Scroll>
              )}
            </div>
          </Popover>
        </div>

        <Portal to={teleportSubmitButtonTo}>
          <Button fullWidth type="button" onClick={() => hiddenSubmitButtonEl.current.click()}>
            Invite
          </Button>
        </Portal>

        <input ref={hiddenSubmitButtonEl} type="submit" hidden />
      </form>
    </>
  );
};

export default RoomInviteMembersForm;
