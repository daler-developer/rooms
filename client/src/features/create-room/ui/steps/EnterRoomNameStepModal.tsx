import { Button, Input } from "@/shared/ui";

import { Step } from "@/features/create-room/store.ts";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import { useCreateRoomForm } from "../../hooks.ts";
import { KeyboardEventHandler } from "react";

const EnterRoomNameStepModal = () => {
  const { store } = useCreateRoomContext();

  const form = useCreateRoomForm();

  const handleNext = () => {
    const isValid = form.validate("name");

    if (isValid) {
      form.stopValidationOnChange("name");
      store.setStep(Step.UploadThumbnail);
    } else {
      form.runValidationOnChange("name");
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleNext();
    }
  };

  return (
    <BaseStepModal
      title="Enter room name"
      isOpen={store.showCurrentStep && store.step === Step.EnterRoomName}
      nextStep={
        <Button color="default" type="button" onClick={handleNext}>
          Next
        </Button>
      }
      onClose={() => {
        form.reset();
        store.setShowCurrentStep(false);
        store.setStep(Step.EnterRoomName);
      }}
    >
      <div>
        {form.renderField("name", ({ getFieldProps, errors }) => (
          <div>
            <Input {...getFieldProps()} placeholder="Enter room name" errors={errors} onKeyDown={handleKeyDown} />
          </div>
        ))}
      </div>
    </BaseStepModal>
  );
};

export default EnterRoomNameStepModal;
