import { useId } from "react";
import { IconButton } from "@/shared/ui";
import { HiPlus } from "react-icons/hi2";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";
import { CreateRoomInput } from "@/__generated__/graphql.ts";
import { withCreateRoomStore } from "../store";
import { FormProvider, useForm } from "@/shared/lib/form";
import EnterRoomNameStepModal from "@/features/create-room/ui/steps/EnterRoomNameStepModal.tsx";
import UploadThumbnailStepModal from "./steps/UploadThumbnailStepModal.tsx";
import InviteUsersStepModal from "@/features/create-room/ui/steps/InviteUsersStepModal.tsx";
import * as yup from "yup";
import { useCreateRoomStore } from "../store.ts";
import { FormValues } from "../types";
import { roomThumbnailRepository } from "@/global/superbase/repository";
import { SupabaseErrorDisplay, useSupabaseOperation } from "@/global/superbase";
import useCreateRoomMutation from "../gql/useCreateRoomMutation.ts";

const validationSchema = yup.object({
  name: yup.string().required().min(5).max(100),
});

const CreateRoomButton = () => {
  const formId = useId();

  const store = useCreateRoomStore();

  const mutations = {
    createRoom: useCreateRoomMutation(),
  };

  const addRoomThumbnail = useSupabaseOperation((file) => {
    return roomThumbnailRepository.addOne({ file });
  });

  const form = useForm<FormValues>({
    resetAfterSubmit: false,
    initialValues: {
      name: "",
      invitedUsers: [],
      thumbnail: null,
    },
    validationSchema,
    async onSubmit(values) {
      const input = {
        name: values.name,
        usersInvitedIds: values.invitedUsers.map((user) => user.id),
      } as CreateRoomInput;

      if (values.thumbnail) {
        input.thumbnailUrl = await addRoomThumbnail.run(values.thumbnail!);
      }

      await mutations.createRoom.mutate({
        variables: {
          input,
        },
      });
    },
  });

  return (
    <FormProvider form={form}>
      <IconButton
        size="lg"
        type="button"
        Icon={HiPlus}
        onClick={() => {
          store.setShowCurrentStep(true);
        }}
      />

      <EnterRoomNameStepModal />
      <UploadThumbnailStepModal />
      <InviteUsersStepModal
        formId={formId}
        errors={
          <div className="mt-2">
            <SupabaseErrorDisplay error={addRoomThumbnail.error} />
            <ApolloErrorDisplay error={mutations.createRoom.error} />
          </div>
        }
      />

      <form id={formId} onSubmit={form.handleSubmit} />
    </FormProvider>
  );
};

export default withCreateRoomStore(CreateRoomButton);
