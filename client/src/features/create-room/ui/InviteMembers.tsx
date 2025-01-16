import { useState } from "react";
import { Input } from "@/shared/ui";
import { NetworkStatus, useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "../gql";
import { Popover, Spinner, Scroll } from "@/shared/ui";
import { useDebouncedValue } from "@/shared/hooks";
import UserSearchResultCard from "./UserSearchResultCard.tsx";
import { useFormContext } from "@/shared/lib/legacy-form";
import InvitedMember from "./InvitedMember.tsx";
import { FormFields } from "./CreateRoomForm.tsx";

const LIMIT = 7;

const InviteMembers = () => {
  const [searchInput, setSearchInput] = useState("");

  const form = useFormContext<FormFields>();

  const debouncedSearchInput = useDebouncedValue(searchInput);

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

  const invitedUsers = form.getValue("invitedUsers");

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

  return (
    <div className="mt-4">
      {invitedUsers.length > 0 && (
        <div className="mt-2">
          <Scroll className="flex items-start gap-x-1">
            {invitedUsers.map((user) => (
              <InvitedMember key={user.id} user={user} />
            ))}
          </Scroll>
        </div>
      )}

      <div className="mt-4">
        <Popover
          width="full"
          trigger={<Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search..." />}
          placement="bottom"
          offset={10}
          onOpen={() => {
            searchUsers();
          }}
        >
          <div className="bg-white shadow-xl border border-gray-00 rounded-lg">
            {loading && !isFetchingMore ? (
              <div className="h-[200px] flex items-center justify-center bg-white shadow-xl">
                <Spinner />
              </div>
            ) : (
              <Scroll height={200} className="rounded-lg bg-white" onScrollToBottom={handleScrollToBottom}>
                {data && (
                  <div className="p-[5px]">
                    <ul className="flex flex-col gap-2">
                      {data.searchUsers.users.map((user) => (
                        <UserSearchResultCard key={user.id} user={user} />
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
    </div>
  );
};

export default InviteMembers;
