import { Button, Modal } from "@/shared/ui";
import { ComponentProps, ReactElement, ReactNode, useMemo } from "react";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";
import { Step } from "../../store";

type Props = {
  children: ReactNode;
  title: ComponentProps<typeof Modal>["title"];
  prevStep?: ReactElement;
  nextStep?: ReactElement;
  submitButton?: ReactElement;
  isOpen: boolean;
  onClose: () => void;
};

const BaseStepModal = ({ children, title, prevStep, nextStep, submitButton, isOpen, onClose }: Props) => {
  const actions = [];

  if (prevStep) {
    actions.push(prevStep);
  }

  if (nextStep) {
    actions.push(nextStep);
  }

  if (submitButton) {
    actions.push(submitButton);
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={() => onClose()} actions={actions}>
      {children}
    </Modal>
  );
};

export default BaseStepModal;
