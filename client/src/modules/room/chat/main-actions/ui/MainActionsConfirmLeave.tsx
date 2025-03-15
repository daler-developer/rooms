import { Button, Modal } from "@/shared/ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const MainActionsConfirmLeave = ({ isOpen, onClose, onConfirm }: Props) => {
  return (
    <Modal
      title="Confirmation"
      isOpen={isOpen}
      onClose={onClose}
      actions={[
        <Button color="light" type="button" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          type="button"
          color="red"
          onClick={() => {
            onClose();
            onConfirm();
          }}
        >
          Leave
        </Button>,
      ]}
    >
      <p>Are you sure you want to leave this Room?</p>
    </Modal>
  );
};

export default MainActionsConfirmLeave;
