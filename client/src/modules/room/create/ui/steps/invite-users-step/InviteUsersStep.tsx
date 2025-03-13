import { Button, type ModalActions } from "@/shared/ui";
import { useId, ReactNode } from "react";
import { useCreateRoomStore, Step } from "../../../store";
import BaseStep from "../BaseStep.tsx";
import { useCreateRoomForm } from "../../../hooks";
import { UsersSelector } from "@/widgets/users-selector";
import { useAuth } from "@/modules/auth";

type Props = {
  formId: ReturnType<typeof useId>;
  errors: ReactNode;
};

const InviteUsersStep = ({ formId, errors }: Props) => {
  const { userId } = useAuth();
  const store = useCreateRoomStore();
  const form = useCreateRoomForm();

  const actions: ModalActions = [
    <Button color="light" type="button" onClick={() => store.setStep(Step.UploadThumbnail)}>
      Prev
    </Button>,
    <Button isLoading={form.isSubmitting} type="submit" form={formId}>
      Create
    </Button>,
  ];

  return (
    <BaseStep
      title="Invite users"
      isOpen={store.showCurrentStep && store.step === Step.InviteUsers}
      onClose={() => {
        form.reset();
        store.setShowCurrentStep(false);
        store.setStep(Step.EnterRoomName);
      }}
      actions={actions}
    >
      <div>
        <UsersSelector
          excludeIds={[userId!]}
          users={form.getValue("invitedUsers")}
          onSelect={(user) => {
            form.appendArrayItem("invitedUsers", user);
          }}
          onDeselect={(user) => {
            const idx = form.findArrayItemIndex("invitedUsers", (_user) => _user.id === user.id);
            form.removeArrayItem("invitedUsers", idx);
          }}
        />

        {errors}
      </div>
    </BaseStep>
  );
};

export default InviteUsersStep;
