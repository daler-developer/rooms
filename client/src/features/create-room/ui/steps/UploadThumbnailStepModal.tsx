import { Avatar, Button, FileUpload, Input, Modal } from "@/shared/ui";
import { useMemo, useRef, useState } from "react";
import { useCreateRoomStore, Step } from "@/features/create-room/store.ts";
import { CropFileModal, CropFileModalHandle } from "@/modules/crop-file";
import { useFormContext } from "@/shared/lib/form";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import { useCreateRoomContext } from "@/features/create-room/context.tsx";

const UploadThumbnailStepModal = () => {
  const { form, store } = useCreateRoomContext();

  const thumbnail = form.getValue("thumbnail");

  const thumbnailURL = useMemo(() => {
    if (thumbnail) {
      return URL.createObjectURL(thumbnail);
    } else {
      return null;
    }
  }, [thumbnail]);

  const cropFileModal = useRef<CropFileModalHandle>(null!);

  const handleFilesUpload = async (files: File[]) => {
    try {
      const croopedImage = await cropFileModal.current.open(files[0]!);

      form.setValue("thumbnail", croopedImage);
    } catch {}
  };

  const handleRemove = () => {
    form.setValue("thumbnail", null);
  };

  const handleReplace = async () => {
    try {
    } catch {}
  };

  return (
    <>
      <BaseStepModal
        title="Upload thumbnail"
        isOpen={store.showCurrentStep && store.step === Step.UploadThumbnail}
        prevStep={
          <Button color="light" type="button" onClick={() => store.setStep(Step.EnterRoomName)}>
            Prev
          </Button>
        }
        nextStep={
          <Button color="default" type="button" onClick={() => store.setStep(Step.InviteUsers)}>
            Skip
          </Button>
        }
        onClose={() => {
          form.reset();
          store.setShowCurrentStep(false);
          store.setStep(Step.EnterRoomName);
        }}
      >
        <div>
          {!thumbnail && <FileUpload onUpload={handleFilesUpload} />}
          {thumbnail && (
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" src={thumbnailURL} />
              <div className="flex items-center gap-1">
                <Button type="button" color="red" size="sm" onClick={handleRemove}>
                  Remove
                </Button>
                <Button type="button" color="light" size="sm" onClick={handleReplace}>
                  Replace
                </Button>
              </div>
            </div>
          )}
        </div>
      </BaseStepModal>

      <CropFileModal ref={cropFileModal} />
    </>
  );
};

export default UploadThumbnailStepModal;
