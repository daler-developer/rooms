import { Avatar, Button, FileUpload, IconButton, type ModalActions } from "@/shared/ui";
import { useMemo } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { Step } from "@/features/create-room/store.ts";
import BaseStepModal from "@/features/create-room/ui/steps/BaseStepModal.tsx";
import { useCreateRoomStore } from "../../store.ts";
import { useCrop } from "@/shared/crop";
import { useCreateRoomForm } from "../../hooks.ts";

const UploadThumbnailStepModal = () => {
  const store = useCreateRoomStore();

  const form = useCreateRoomForm();

  const thumbnail = form.getValue("thumbnail");

  const thumbnailURL = useMemo(() => {
    if (thumbnail) {
      return URL.createObjectURL(thumbnail);
    } else {
      return null;
    }
  }, [thumbnail]);

  const crop = useCrop();

  const handleFilesUpload = async (files: File[]) => {
    try {
      store.setShowCurrentStep(false);
      const croppedImage = await crop.open(files[0]);
      form.setValue("thumbnail", croppedImage);
    } finally {
      store.setShowCurrentStep(true);
    }
  };

  const handleRemove = () => {
    form.setValue("thumbnail", null);
  };

  const actions: ModalActions = [
    <Button color="light" type="button" onClick={() => store.setStep(Step.EnterRoomName)}>
      Prev
    </Button>,
    <Button color="default" type="button" onClick={() => store.setStep(Step.InviteUsers)}>
      {thumbnail ? "Next" : "Skip"}
    </Button>,
  ];

  return (
    <>
      <BaseStepModal
        title="Upload thumbnail"
        isOpen={store.showCurrentStep && store.step === Step.UploadThumbnail}
        actions={actions}
        onClose={() => {
          form.reset();
          store.setShowCurrentStep(false);
          store.setStep(Step.EnterRoomName);
        }}
      >
        <div>
          {thumbnail ? (
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" src={thumbnailURL} badgeContent={<IconButton type="button" Icon={HiOutlineTrash} color="red" onClick={handleRemove} />} />
            </div>
          ) : (
            <FileUpload multiple={false} accept="image/*" onUpload={handleFilesUpload} />
          )}
        </div>
      </BaseStepModal>
    </>
  );
};

export default UploadThumbnailStepModal;
