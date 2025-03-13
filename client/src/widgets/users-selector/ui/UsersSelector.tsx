import { Scroll, Input, Popover, Spinner } from "@/shared/ui";
import { ReactNode, useMemo, useState } from "react";
import { useDebouncedFn } from "@/shared/hooks";
import { NetworkStatus } from "@apollo/client";
import UsersSelectorSelectedUser from "./UsersSelectorSelectedUser.tsx";
import UsersSelectorSearchResultCard from "./UsersSelectorSearchResultCard.tsx";
import useSearchUsersQuery from "../gql/useSearchUsersQuery.ts";
import { UsersSelectorSearchUsersQuery } from "@/__generated__/graphql.ts";
import useUsersOnlineStatusChangeSub from "../gql/useUsersOnlineStatusChangeSub.ts";

const LIMIT = 6;

export type User = Flatten<UsersSelectorSearchUsersQuery["searchUsers"]["data"]>;

type Props = {
  users: User[];
  onSelect: (user: User) => void;
  onDeselect: (user: User) => void;
  userIsSelectable?: (user: User) => boolean;
  excludeIds?: number[];
  badgeContent?: (user: User) => ReactNode;
};

const UsersSelector = ({ users, onSelect, onDeselect, excludeIds = [], userIsSelectable = (_) => true, badgeContent = (_) => null }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const queries = {
    searchUsers: useSearchUsersQuery({
      filter: {
        q: "",
        offset: 0,
        limit: LIMIT,
        excludeIds,
      },
    }),
  };

  const userIds = users.map((user) => user.id);

  useUsersOnlineStatusChangeSub({ userIds });

  const refetchDebounced = useDebouncedFn((q: string) => {
    queries.searchUsers.refetch({
      filter: {
        q,
        offset: 0,
        limit: LIMIT,
        excludeIds,
      },
    });
  }, 300);

  const fetchMoreUsersIfHasMore = async () => {
    if (!queries.searchUsers.data!.searchUsers.hasMore) {
      return;
    }

    await queries.searchUsers.fetchMore({
      variables: {
        filter: {
          ...queries.searchUsers.variables!.filter,
          offset: queries.searchUsers.data!.searchUsers.data.length,
        },
      },
    });
  };

  const showSpinner = useMemo(() => {
    return [NetworkStatus.loading, NetworkStatus.setVariables].includes(queries.searchUsers.networkStatus);
  }, [queries.searchUsers.networkStatus]);

  const showResults = useMemo(() => {
    return (
      [NetworkStatus.fetchMore, NetworkStatus.ready].includes(queries.searchUsers.networkStatus) &&
      queries.searchUsers.data &&
      queries.searchUsers.data.searchUsers.data.length > 0
    );
  }, [queries.searchUsers.networkStatus, queries.searchUsers.data]);

  const showEmpty = useMemo(() => {
    return (
      [NetworkStatus.ready].includes(queries.searchUsers.networkStatus) && queries.searchUsers.data && queries.searchUsers.data.searchUsers.data.length === 0
    );
  }, [queries.searchUsers.networkStatus, queries.searchUsers.data]);

  return (
    <div>
      {users.length > 0 && (
        <div className="mb-4">
          <Scroll>
            <div className="flex items-start gap-x-1">
              {users.map((user) => (
                <UsersSelectorSelectedUser key={user.id} user={user} onDeselect={() => onDeselect(user)} />
              ))}
            </div>
          </Scroll>
        </div>
      )}

      <div>
        <Popover
          width="full"
          trigger={
            <div>
              <Input
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  refetchDebounced(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
          }
          placement="bottom"
          offset={5}
          onOpen={async () => {
            await queries.searchUsers.fetch();
          }}
        >
          <div className="bg-white shadow-xl border border-gray-00">
            {showSpinner && (
              <div className="h-[50px] flex items-center justify-center bg-white shadow-xl">
                <Spinner />
              </div>
            )}

            {showResults && (
              <div>
                <Scroll
                  height="max-200px"
                  showScrollToBottomButton={false}
                  onScrollToBottom={() => {
                    fetchMoreUsersIfHasMore();
                  }}
                  onReachBottomThreshold={() => {
                    // fetchMoreUsersIfHasMore();
                  }}
                >
                  <ul className="flex flex-col gap-2 p-2">
                    {[...queries.searchUsers.data!.searchUsers.data].map((user) => (
                      <UsersSelectorSearchResultCard
                        key={user.id}
                        user={user}
                        isSelected={!!users.find((_user) => _user.id === user.id)}
                        isSelectable={userIsSelectable(user)}
                        onSelect={() => onSelect(user)}
                        onDeselect={() => onDeselect(user)}
                        badgeContent={badgeContent(user)}
                      />
                    ))}
                  </ul>
                </Scroll>
              </div>
            )}

            {showEmpty && (
              <div className="h-[50px] flex items-center justify-center text-gray-500">
                <span>No results</span>
              </div>
            )}
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default UsersSelector;
