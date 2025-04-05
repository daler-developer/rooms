import { useState } from "react";
import { useSubscription } from "@apollo/client";
import { Button, Modal } from "@/shared/ui";
import { ME_IS_EXCLUDED_FROM_ROOM } from "../gql/tags";
import { useRoomChatEmitter } from "../emitter";
import { useRoomId } from "../context";

const ExcludedFromRoomModal = () => {
  const [showModal, setShowModal] = useState(false);

  const roomId = useRoomId();

  const emitter = useRoomChatEmitter();

  useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data }) {
      if (data.data!.meIsExcludedFromRoom.id === roomId) {
        setShowModal(true);
      }
    },
  });

  const handleLeave = () => {
    setShowModal(false);
    emitter.emit("EXCLUDED_FROM_ROOM");
  };

  const leaveRoom = (
    <Button type="button" onClick={handleLeave}>
      Ok
    </Button>
  );

  return (
    <Modal
      title="You were excluded from this Room!"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      actions={[leaveRoom]}
      closeOnOverlayClick={false}
      withCloseButton={false}
    >
      Please leave the room
    </Modal>
  );
};

export default ExcludedFromRoomModal;
