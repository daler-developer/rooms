import { Button, Input, Modal, Popover, Scroll, Spinner } from "@/shared/ui";
import { useCreateRoomStore, Step } from "@/features/create-room/store.ts";
import { useEffect, useState } from "react";
import { useFormContext } from "@/shared/lib/form";
import { FormFields } from "@/features/create-room/ui/CreateRoomForm.tsx";
import { useDebouncedValue } from "@/shared/hooks";
import { NetworkStatus, useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "@/features/create-room/gql";
import InvitedMember from "@/features/create-room/ui/InvitedMember.tsx";
import UserSearchResultCard from "@/features/create-room/ui/UserSearchResultCard.tsx";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import { useAuth } from "@/modules/auth";

const LIMIT = 7;

const InviteUsersStepModal = () => {
  const { formId, form, store } = useCreateRoomContext();

  const [searchInput, setSearchInput] = useState("");

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
    <BaseStepModal
      title="Invite users"
      isOpen={store.showCurrentStep && store.step === Step.InviteUsers}
      onClose={() => {
        form.reset();
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
          <div className="mt-2">
            <Scroll className="h-[40px] flex items-start gap-x-1">
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
                <div>
                  <div className="h-[300px]">
                    <Scroll height={300} className="h-full rounded-lg bg-white" onScrollToBottom={handleScrollToBottom}>
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
                  </div>
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
