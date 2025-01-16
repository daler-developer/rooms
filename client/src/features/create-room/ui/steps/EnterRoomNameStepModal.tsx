import { Button, Input, Modal } from "@/shared/ui";
import { useState } from "react";
import { useFormContext } from "@/shared/lib/form";
import { useCreateRoomStore, Step } from "@/features/create-room/store.ts";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";

const EnterRoomNameStepModal = () => {
  const { form, store } = useCreateRoomContext();

  const handleNext = () => {
    const isValid = form.validate("name");

    if (isValid) {
      form.stopValidationOnChange("name");
      store.setStep(Step.UploadThumbnail);
    } else {
      form.runValidationOnChange("name");
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
      onClose={() => {}}
    >
      <div>
        {form.renderField("name", ({ getFieldProps, errors, hasErrors }) => (
          <div>
            <Input {...getFieldProps()} placeholder="Enter room name" error={hasErrors} />
            <ul>
              {errors.map((error) => (
                <li>{error}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </BaseStepModal>
  );
};

export default EnterRoomNameStepModal;
