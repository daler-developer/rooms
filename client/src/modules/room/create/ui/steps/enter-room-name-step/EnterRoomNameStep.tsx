import { Button, Input, type ModalActions } from "@/shared/ui";

import { Step } from "../../../store.ts";
import { useCreateRoomStore } from "../../../store.ts";
import BaseStep from "../BaseStep.tsx";
import { useCreateRoomForm } from "../../../hooks.ts";
import { KeyboardEventHandler } from "react";

const EnterRoomNameStep = () => {
  const store = useCreateRoomStore();

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

  const actions: ModalActions = [
    <Button color="default" type="button" onClick={handleNext}>
      Next
    </Button>,
  ];

  return (
    <BaseStep
      title="Enter room name"
      isOpen={store.showCurrentStep && store.step === Step.EnterRoomName}
      actions={actions}
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
    </BaseStep>
  );
};

export default EnterRoomNameStep;
