import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "@/features/create-room/gql";
import { FormProvider, useForm } from "@/shared/lib/form";
import * as yup from "yup";
import { CreateRoomStoreProvider } from "@/features/create-room/store.ts";
import { CreateRoomContextProvider } from "@/features/create-room/context.tsx";
import { ComponentType } from "react";

const validationSchema = yup.object({
  name: yup.string().required().min(5).max(100),
});

const withCreateRoomContextProvider = (Wrapper: ComponentType) => {
  return (...props) => {
    const [createRoom, { loading }] = useMutation(CREATE_ROOM);

    const form = useForm({
      initialValues: {
        name: "",
        invitedUsers: [],
        thumbnail: null,
      },
      validationSchema,
      async onSubmit(values) {
        await createRoom({
          variables: {
            input: {
              name: values.name,
              usersInvitedIds: values.invitedUsers.map((user) => user.id),
              thumbnailUrl: URL.createObjectURL(values.thumbnail!),
            },
          },
        });
      },
    });

    return (
      <CreateRoomStoreProvider>
        <FormProvider form={form}>
          <CreateRoomContextProvider>
            <Wrapper {...props} />
          </CreateRoomContextProvider>
        </FormProvider>
      </CreateRoomStoreProvider>
    );
  };
};

export default withCreateRoomContextProvider;
