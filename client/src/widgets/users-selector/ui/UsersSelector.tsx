import { Scroll, Input, Popover, Spinner } from "@/shared/ui";
import { useMemo, useState } from "react";
import { useDebouncedFn } from "@/shared/hooks";
import { NetworkStatus, useSubscription } from "@apollo/client";
import UsersSelectorSelectedUser from "./UsersSelectorSelectedUser.tsx";
import UsersSelectorSearchResultCard from "./UsersSelectorSearchResultCard.tsx";
import useSearchUsersQuery from "../gql/useSearchUsersQuery.ts";
import { USERS_ONLINE_STATUS_CHANGE } from "../gql/tags";
import { UsersSelectorSearchUsersQuery } from "@/__generated__/graphql.ts";

const LIMIT = 6;

type Props = {
  excludeMe?: boolean;
  onChange: (userIds: number[]) => void;
  userIsSelectable?: (userId: number) => boolean;
};

export type User = Flatten<UsersSelectorSearchUsersQuery["searchUsers"]["data"]>;

const UsersSelector = ({ onChange, excludeMe = false, userIsSelectable }: Props) => {
  const [usersSelected, setUsersSelected] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const queries = {
    searchUsers: useSearchUsersQuery({
      filter: {
        q: "",
        offset: 0,
        limit: LIMIT,
        excludeMe,
      },
    }),
  };

  const userIds = usersSelected.map((user) => user.id);

  useSubscription(USERS_ONLINE_STATUS_CHANGE, {
    variables: {
      userIds,
    },
    skip: !userIds.length,
  });

  const refetchDebounced = useDebouncedFn((q: string) => {
    queries.searchUsers.refetch({
      filter: {
        q,
        offset: 0,
        limit: LIMIT,
        excludeMe: true,
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

  const handleUserDeselect = (user: User) => {
    setUsersSelected((prev) => {
      const newValue = prev.filter((_user) => _user.id !== user.id);
      onChange(newValue.map((v) => v.id));
      return newValue;
    });
  };

  const handleUserSelect = (user: User) => {
    setUsersSelected((prev) => {
      const newValue = [...prev, user];
      onChange(newValue.map((v) => v.id));
      return newValue;
    });
  };

  return (
    <div>
      {usersSelected.length > 0 && (
        <div className="mb-4">
          <Scroll>
            <div className="flex items-start gap-x-1">
              {usersSelected.map((user) => (
                <UsersSelectorSelectedUser key={user.id} user={user} onUnselect={() => handleUserDeselect(user)} />
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
                        isSelected={!!usersSelected.find((_user) => _user.id === user.id)}
                        isSelectable={userIsSelectable?.(user.id) || false}
                        onSelect={() => handleUserSelect(user)}
                        onDeselect={() => handleUserDeselect(user)}
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
