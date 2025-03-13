import { Modal } from "@/shared/ui";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { RoomInviteMembersForm } from "@/features/room-invite-members";

export type RoomInviteMembersModalHandler = {
  open: (o: { roomId: number }) => Promise<void>;
};

const RoomInviteMembersModal = forwardRef<RoomInviteMembersModalHandler, {}>(({}, ref) => {
  const [roomId, setRoomId] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);
  const [submitButtonWrapperEl, setSubmitButtonWrapperEl] = useState<HTMLElement | null>(null);

  const promiseResolveFn = useRef<() => void | null>(null);
  const promiseRejectFn = useRef<() => void | null>(null);

  useImperativeHandle(ref, () => ({
    open({ roomId }: { roomId: number }) {
      setRoomId(roomId);
      setShowModal(true);

      return new Promise((res, rej) => {
        promiseResolveFn.current = res;
        promiseRejectFn.current = rej;
      });
    },
  }));

  const modalActions = [
    <div
      ref={(el) => {
        if (el) {
          setSubmitButtonWrapperEl(el);
        } else {
          setSubmitButtonWrapperEl(null);
        }
      }}
    />,
  ];

  const handleInviteSuccess = () => {
    promiseResolveFn.current!();
    setShowModal(false);
  };

  if (!showModal) {
    return (
      <Modal title="Invite Users" isOpen={showModal} onClose={() => setShowModal(false)}>
        <div />
      </Modal>
    );
  }

  return (
    <Modal
      title="Invite Users"
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        promiseRejectFn.current!();
      }}
      actions={modalActions}
    >
      {submitButtonWrapperEl && <RoomInviteMembersForm roomId={roomId} onSuccess={handleInviteSuccess} teleportSubmitButtonTo={submitButtonWrapperEl!} />}
    </Modal>
  );
});

export default RoomInviteMembersModal;
