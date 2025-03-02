import { IconButton } from "@/shared/ui";
import { HiPlus } from "react-icons/hi2";
import { CreateRoomStoreProvider } from "../store";
import { useForm, FormProvider } from "@/shared/lib/form";
import EnterRoomNameStepModal from "@/features/create-room/ui/steps/EnterRoomNameStepModal.tsx";
import UploadThumbnailStepModal from "./steps/UploadThumbnailStepModal.tsx";
import InviteUsersStepModal from "@/features/create-room/ui/steps/InviteUsersStepModal.tsx";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "@/features/create-room/gql";
import { CreateRoomContextProvider, useCreateRoomContext } from "@/features/create-room/context.tsx";
import { useAuth } from "@/modules/auth";
import { FormValues } from "../types";
import { useCreateRoomForm } from "../hooks.ts";
import { roomThumbnailRepository } from "@/global/superbase/repository";
import { useSupabaseOperation, SupabaseErrorMessage } from "@/global/superbase";

type Props = {};

const CreateRoomButton = ({}: Props) => {
  const { formId, store } = useCreateRoomContext() as any;
  const form = useCreateRoomForm();

  return (
    <>
      <IconButton size="lg" type="button" Icon={HiPlus} onClick={() => store.setShowCurrentStep(true)} />

      <EnterRoomNameStepModal />
      <UploadThumbnailStepModal />
      <InviteUsersStepModal />

      <form id={formId} onSubmit={form.handleSubmit} />
    </>
  );
};

const validationSchema = yup.object({
  name: yup.string().required().min(5).max(100),
});

const CreateRoomButtonWrapper = (props: Props) => {
  const { userId } = useAuth();

  const [createRoom] = useMutation(CREATE_ROOM, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify({ __typename: "User", id: userId }),
        fields: {
          rooms(prevInvitations) {
            if (!prevInvitations) {
              return prevInvitations;
            }

            return [...prevInvitations, data!.createRoom];
          },
        },
      });
    },
  });

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
      const thumbnailUrl = await addRoomThumbnail.run(values.thumbnail!);

      await createRoom({
        variables: {
          input: {
            name: values.name,
            usersInvitedIds: values.invitedUsers.map((user) => user.id),
            thumbnailUrl,
          },
        },
      });
    },
  });

  return (
    <CreateRoomStoreProvider>
      <FormProvider form={form}>
        <CreateRoomContextProvider>
          <CreateRoomButton {...props} />
        </CreateRoomContextProvider>
      </FormProvider>
    </CreateRoomStoreProvider>
  );
};

export default CreateRoomButtonWrapper;
