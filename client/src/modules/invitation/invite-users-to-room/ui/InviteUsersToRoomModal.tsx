import { Button, Modal, Spinner, useToast } from "@/shared/ui";
import { forwardRef, MutableRefObject, useId, useImperativeHandle, useRef, useState } from "react";
import InviteUsersToRoomForm from "./InviteUsersToRoomForm.tsx";
import { FormProvider, useForm } from "@/shared/lib/form";
import * as yup from "yup";
import { FormValues } from "../types";
import useInviteUsersToRoomMutation from "../gql/useInviteUsersToRoomMutation.ts";
import { useCustomLazyQuery } from "@/shared/lib/graphql";
import { GET_PARTICIPANTS, GET_INVITED_USERS } from "../gql/tags.ts";

export type RoomInviteMembersModalHandler = {
  open: (o: { roomId: number }) => Promise<void>;
};

type PromiseResolve = (value: void | PromiseLike<void>) => void;

const InviteUsersToRoomModal = forwardRef<RoomInviteMembersModalHandler, {}>(({}, ref) => {
  const [roomId, setRoomId] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const promiseResolveFn: MutableRefObject<PromiseResolve | null> = useRef(null);

  const queries = {
    participants: useCustomLazyQuery(GET_PARTICIPANTS, {
      variables: {
        roomId,
      },
      fetchPolicy: "cache-and-network",
    }),
    invitedUsers: useCustomLazyQuery(GET_INVITED_USERS, {
      variables: {
        roomId,
      },
      fetchPolicy: "cache-and-network",
    }),
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
      promiseResolveFn.current!();
    },
  });

  const formId = useId();

  useImperativeHandle(ref, () => ({
    open({ roomId }) {
      setRoomId(roomId);
      setShowModal(true);
      queries.participants.fetch();
      queries.invitedUsers.fetch();

      return new Promise((res) => {
        promiseResolveFn.current = res;
      });
    },
  }));

  const handleCancel = () => {
    form.reset();
    setShowModal(false);
    promiseResolveFn.current!();
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
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
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
          promiseResolveFn.current!();
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
