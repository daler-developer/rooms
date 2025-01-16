import { Button, Modal } from "@/shared/ui";
import { useState } from "react";
import { useSubscription } from "@apollo/client";
import { ME_IS_EXCLUDED_FROM_ROOM } from "@/widgets/room-chat/gql/tags.ts";
import { useRoomChatStore } from "@/widgets/room-chat/context";

const MeExcludedFromRoomModal = () => {
  const { roomId } = useRoomChatStore();

  const [showModal, setShowModal] = useState(false);

  useSubscription(ME_IS_EXCLUDED_FROM_ROOM, {
    onData({ data }) {
      if (data.data!.meIsExcludedFromRoom.id === roomId) {
        setShowModal(true);
      }
    },
  });

  const handleLeave = () => {
    setShowModal(false);
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

export default MeExcludedFromRoomModal;
