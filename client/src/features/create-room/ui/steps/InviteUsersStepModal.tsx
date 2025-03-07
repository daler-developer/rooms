import { Button, Input, type ModalActions, Popover, Spinner } from "@/shared/ui";
import { Step } from "@/features/create-room/store.ts";
import { useMemo, useState, useId, ReactNode } from "react";
import { useDebouncedFn } from "@/shared/hooks";
import { NetworkStatus, useSubscription } from "@apollo/client";
import InvitedMember from "@/features/create-room/ui/InvitedMember.tsx";
import UserSearchResultCard from "@/features/create-room/ui/UserSearchResultCard.tsx";
import { useCreateRoomStore } from "../../store";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import Scroll from "@/shared/ui/components/ScrollV2/Scroll.tsx";
import useSearchUsersQuery from "../../gql/useSearchUsersQuery";
import { USERS_ONLINE_STATUS_CHANGE } from "../../gql";
import { useCreateRoomForm } from "../../hooks";

const LIMIT = 6;

type Props = {
  formId: ReturnType<typeof useId>;
  errors: ReactNode;
};

const InviteUsersStepModal = ({ formId, errors }: Props) => {
  const store = useCreateRoomStore();

  const form = useCreateRoomForm();

  const [searchInput, setSearchInput] = useState("");

  const queries = {
    searchUsers: useSearchUsersQuery({
      filter: {
        q: "",
        offset: 0,
        limit: LIMIT,
        excludeMe: true,
      },
    }),
  };

  const userIds = queries.searchUsers.data?.searchUsers.data.map((user) => user.id) || [];

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

  const invitedUsers = form.getValue("invitedUsers");

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

  const actions: ModalActions = [
    <Button color="light" type="button" onClick={() => store.setStep(Step.UploadThumbnail)}>
      Prev
    </Button>,
    <Button isLoading={form.isSubmitting} type="submit" form={formId}>
      Create
    </Button>,
  ];

  return (
    <BaseStepModal
      title="Invite users"
      isOpen={store.showCurrentStep && store.step === Step.InviteUsers}
      onClose={() => {
        form.reset();
        store.setShowCurrentStep(false);
        store.setStep(Step.EnterRoomName);
      }}
      actions={actions}
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

        {errors}
      </div>
    </BaseStepModal>
  );
};

export default InviteUsersStepModal;
