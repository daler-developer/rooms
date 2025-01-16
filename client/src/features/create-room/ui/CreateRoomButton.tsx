import { ComponentType, useEffect, useMemo, useState } from "react";
import { Button, IconButton } from "@/shared/ui";
import { HiPlus } from "react-icons/hi2";
import { CreateRoomStoreProvider, useCreateRoomStore, Step } from "../store";
import { useForm, useFormContext, FormProvider } from "@/shared/lib/form";
import EnterRoomNameStepModal from "@/features/create-room/ui/steps/EnterRoomNameStepModal.tsx";
import UploadThumbnailStepModal from "./steps/UploadThumbnailStepModal.tsx";
import InviteUsersStepModal from "@/features/create-room/ui/steps/InviteUsersStepModal.tsx";
import { SearchUsersQuery } from "@/__generated__/graphql.ts";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "@/features/create-room/gql";
import { CreateRoomContextProvider, useCreateRoomContext } from "@/features/create-room/context.tsx";
import { useCustomMutation } from "@/shared/lib/graphql";
import { supabaseClient } from "@/shared/lib/superbase";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const CreateRoomButton = ({}: Props) => {
  const { form, formId, store } = useCreateRoomContext();

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

export type FormFields = {
  name: string;
  invitedUsers: SearchUsersQuery["searchUsers"]["users"];
};

const validationSchema = yup.object({
  name: yup.string().required().min(5).max(100),
});

const CreateRoomButtonWrapper = (props: Props) => {
  const [createRoom, { loading: isCreatingRoom }] = useMutation(CREATE_ROOM);

  const form = useForm({
    initialValues: {
      name: "",
      invitedUsers: [],
      thumbnail: null,
    },
    validationSchema,
    async onSubmit(values) {
      const fileName = uuidv4();

      const { data } = await supabaseClient.storage.from("message_files").upload(fileName, values.thumbnail!);

      if (data) {
        const { publicUrl } = supabaseClient.storage.from("message_files").getPublicUrl(fileName).data;

        await createRoom({
          variables: {
            input: {
              name: values.name,
              usersInvitedIds: values.invitedUsers.map((user) => user.id),
              thumbnailUrl: publicUrl,
            },
          },
        });
      }
    },
  });

  return (
    <CreateRoomStoreProvider>
      <FormProvider form={form}>
        <CreateRoomContextProvider
          createRoomMutation={{
            isLoading: isCreatingRoom,
          }}
        >
          <CreateRoomButton {...props} />
        </CreateRoomContextProvider>
      </FormProvider>
    </CreateRoomStoreProvider>
  );
};

export default CreateRoomButtonWrapper;
