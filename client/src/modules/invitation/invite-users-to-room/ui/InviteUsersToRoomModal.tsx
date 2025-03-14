import { Button, Modal, Skeleton, useToast } from "@/shared/ui";
import { forwardRef, useId, useImperativeHandle, useRef, useState } from "react";
import InviteUsersToRoomForm from "./InviteUsersToRoomForm.tsx";
import { FormProvider, useForm } from "@/shared/lib/form";
import * as yup from "yup";
import { FormValues } from "../types";
import useInviteUsersToRoomMutation from "../gql/useInviteUsersToRoomMutation.ts";
import useGetParticipantsQuery from "@/modules/invitation/invite-users-to-room/gql/useGetParticipantsQuery.ts";
import useGetInvitedUsersQuery from "@/modules/invitation/invite-users-to-room/gql/useGetInvitedUsersQuery.ts";

export type RoomInviteMembersModalHandler = {
  open: (o: { roomId: number }) => Promise<void>;
};

const InviteUsersToRoomModal = forwardRef<RoomInviteMembersModalHandler, {}>(({}, ref) => {
  const [roomId, setRoomId] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const queries = {
    participants: useGetParticipantsQuery({ roomId }),
    invitedUsers: useGetInvitedUsersQuery({ roomId }),
  };

  const mutations = {
    inviteUsersToRoom: useInviteUsersToRoomMutation(),
  };

  const form = useForm<FormValues>({
    resetAfterSubmit: true,
    validationSchema: yup.object({}),
    initialValues: {
      usersSelected: [],
    },
    async onSubmit(values) {
      const userIds = values.usersSelected.map((user) => user.id);
      await mutations.inviteUsersToRoom.mutate({
        variables: {
          roomId,
          invitedUsersIds: userIds,
        },
      });
      toast.success("Invitations sent to users");
      setShowModal(false);
      promiseResolveFn.current();
    },
  });

  const promiseResolveFn = useRef<() => void | null>(null);
  const promiseRejectFn = useRef<() => void | null>(null);

  const formId = useId();

  useImperativeHandle(ref, () => ({
    open({ roomId }) {
      setRoomId(roomId);
      setShowModal(true);

      return new Promise((res, rej) => {
        promiseResolveFn.current = res;
        promiseRejectFn.current = rej;
      });
    },
  }));

  const handleCancel = () => {
    form.reset();
    setShowModal(false);
    promiseResolveFn.current();
  };

  if (!showModal) {
    return (
      <Modal title="Invite Users" isOpen={showModal} onClose={() => setShowModal(false)}>
        <div />
      </Modal>
    );
  }

  if (queries.invitedUsers.loading || queries.participants.loading) {
    return (
      <Modal title="Invite Users" isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col gap-2">
          <Skeleton type="block" width={200} height={20} />
          <Skeleton type="block" width={200} height={20} />
          <Skeleton type="block" width={200} height={20} />
          <Skeleton type="block" width={200} height={20} />
        </div>
      </Modal>
    );
  }

  return (
    <FormProvider form={form}>
      <Modal
        title="Invite Users"
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          promiseRejectFn.current!();
        }}
        actions={[
          <Button color="light" type="button" disabled={form.isSubmitting} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button type="submit" form={formId} isLoading={form.isSubmitting}>
            Invite
          </Button>,
        ]}
      >
        <form id={formId} onSubmit={form.handleSubmit}>
          <InviteUsersToRoomForm roomId={roomId} />
        </form>
      </Modal>
    </FormProvider>
  );
});

export default InviteUsersToRoomModal;
