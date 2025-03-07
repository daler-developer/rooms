import { createZustandStoreFactory } from "@/shared/lib/zustand";

export enum Step {
  EnterRoomName,
  UploadThumbnail,
  InviteUsers,
}

type CreateRoomStore = {
  step: Step;
  setStep: (step: Step) => void;

  showCurrentStep: boolean;
  setShowCurrentStep: (to: boolean) => void;
};

const { useStore: useCreateRoomStore, withStore: withCreateRoomStore } = createZustandStoreFactory<CreateRoomStore>((set) => ({
  step: Step.UploadThumbnail,
  setStep(to) {
    set({
      step: to,
    });
  },

  showCurrentStep: false,
  setShowCurrentStep: (to) => {
    set({
      showCurrentStep: to,
    });
  },
}));

export { useCreateRoomStore, withCreateRoomStore };
