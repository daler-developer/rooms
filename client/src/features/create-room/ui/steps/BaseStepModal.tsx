import { Modal } from "@/shared/ui";
import { ComponentProps } from "react";

type Props = {
  children: ComponentProps<typeof Modal>["children"];
  title: ComponentProps<typeof Modal>["title"];
  isOpen: ComponentProps<typeof Modal>["isOpen"];
  onClose: ComponentProps<typeof Modal>["onClose"];
  actions: ComponentProps<typeof Modal>["actions"];
};

const BaseStepModal = ({ children, title, isOpen, onClose, actions }: Props) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} actions={actions}>
      {children}
    </Modal>
  );
};

export default BaseStepModal;
