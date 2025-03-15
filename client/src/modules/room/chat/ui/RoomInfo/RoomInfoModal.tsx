import { Modal, Tabs } from "@/shared/ui";
import { forwardRef, useImperativeHandle, useState } from "react";
import RoomInfoTabParticipants from "./tabs/room-participants/RoomInfoTabParticipants.tsx";

export type RoomInfoModalHandler = {
  open: () => void;
};

type Tab = "participants" | "settings";

const RoomInfoModal = forwardRef<RoomInfoModalHandler>((_, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<Tab>("participants");

  useImperativeHandle(ref, () => ({
    open() {
      setShowModal(true);
    },
  }));

  return (
    <Modal title="Room Info" isOpen={showModal} onClose={() => setShowModal(false)}>
      <div>
        <Tabs
          items={[
            {
              title: "Participants",
              value: "participants",
            },
            {
              title: "Settings",
              value: "settings",
            },
          ]}
          value={tab}
          onChange={(to) => setTab(to as Tab)}
        />

        <div className="mt-4">{tab === "participants" && <RoomInfoTabParticipants />}</div>
      </div>
    </Modal>
  );
});

export default RoomInfoModal;
