import { Button, Empty, Input, Popover, Spinner } from "@/shared/ui";
import { Step } from "@/features/create-room/store.ts";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedFn, useDebouncedValue } from "@/shared/hooks";
import { NetworkStatus } from "@apollo/client";
import InvitedMember from "@/features/create-room/ui/InvitedMember.tsx";
import UserSearchResultCard from "@/features/create-room/ui/UserSearchResultCard.tsx";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";
import useSearchUsersQuery from "../../gql/useSearchUsersQuery";
import { useCreateRoomForm } from "../../hooks";

const LIMIT = 7;

const InviteUsersStepModal = () => {
  const { formId, store } = useCreateRoomContext();

  const form = useCreateRoomForm();

  const [searchInput, setSearchInput] = useState("");

  const debouncedSearchInput = useDebouncedValue(searchInput);

  const queries = {
    searchUsers: useSearchUsersQuery({
      input: {
        q: "",
        offset: 0,
        limit: LIMIT,
        excludeMe: true,
      },
    }),
  };

  const refetchDebounced = useDebouncedFn((q: string) => {
    queries.searchUsers.refetch({
      input: {
        q,
        offset: 0,
        limit: LIMIT,
        excludeMe: true,
      },
    });
  }, 300);

  // useEffect(() => {
  //   queries.searchUsers.refetch({
  //     input: {
  //       q: debouncedSearchInput,
  //       offset: 0,
  //       limit: LIMIT,
  //       excludeMe: true,
  //     },
  //   });
  // }, [debouncedSearchInput]);

  const invitedUsers = form.getValue("invitedUsers");

  const handleScrollToBottom = async () => {
    console.log("bottom");
    // if (loading) {
    //   return;
    // }
    //
    // if (!data!.searchUsers.hasMore) {
    //   return;
    // }
    //
    // await fetchMore({
    //   variables: {
    //     input: {
    //       ...variables!.input,
    //       offset: data!.searchUsers.users.length,
    //     },
    //   },
    // });
  };

  const showSpinner = useMemo(() => {
    return [NetworkStatus.loading, NetworkStatus.refetch, NetworkStatus.setVariables].includes(queries.searchUsers.networkStatus);
  }, [queries.searchUsers.networkStatus]);

  const showResults = useMemo(() => {
    return queries.searchUsers.networkStatus === NetworkStatus.ready && queries.searchUsers.data;
  }, [queries.searchUsers.networkStatus, queries.searchUsers.data]);

  const showEmpty = useMemo(() => {
    return queries.searchUsers.networkStatus === NetworkStatus.ready && queries.searchUsers.data && queries.searchUsers.data.searchUsers.users.length === 0;
  }, [queries.searchUsers.networkStatus, queries.searchUsers.data]);

  return (
    <BaseStepModal
      title="Invite users"
      isOpen={store.showCurrentStep && store.step === Step.InviteUsers}
      onClose={() => {
        form.reset();
        store.setShowCurrentStep(false);
        store.setStep(Step.EnterRoomName);
      }}
      prevStep={
        <Button color="light" type="button" onClick={() => store.setStep(Step.UploadThumbnail)}>
          Prev
        </Button>
      }
      submitButton={
        <Button isLoading={form.isSubmitting} type="submit" form={formId}>
          Create
        </Button>
      }
    >
      <div>
        {invitedUsers.length > 0 && (
          <div className="mb-4">
            <Scroll>
              <div className="flex items-start gap-x-1">
                {invitedUsers.map((user) => (
                  <InvitedMember key={user.id} user={user} />
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
            <div className="bg-white shadow-xl border border-gray-00 rounded-lg">
              {showSpinner && (
                <div className="h-[50px] flex items-center justify-center bg-white shadow-xl">
                  <Spinner />
                </div>
              )}

              {showResults && (
                <div>
                  <Scroll height="max-200px" showScrollToBottomButton={false} onScrollToBottom={handleScrollToBottom}>
                    <ul className="flex flex-col gap-2 p-2">
                      {[
                        ...queries.searchUsers.data!.searchUsers.users,
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // ...queries.searchUsers.data!.searchUsers.users,
                        // ...queries.searchUsers.data!.searchUsers.users,
                        // ...queries.searchUsers.data!.searchUsers.users,
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                        // queries.searchUsers.data!.searchUsers.users[0],
                      ].map((user) => (
                        <UserSearchResultCard key={user.id} user={user} />
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
    </BaseStepModal>
  );
};

export default InviteUsersStepModal;
