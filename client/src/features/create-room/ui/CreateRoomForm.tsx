import { FormProvider, useForm, ErrorMessages } from "@/shared/lib/legacy-form";
import * as yup from "yup";
import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";
import InviteMembers from "./InviteMembers";
import { useMutation } from "@apollo/client";
import { CREATE_ROOM } from "@/features/create-room/gql";
import { SearchUsersQuery } from "@/__generated__/graphql.ts";

export type FormFields = {
  name: string;
  invitedUsers: SearchUsersQuery["searchUsers"]["users"];
};

const validationSchema = yup.object({
  name: yup.string().required(),
});

const CreateRoomForm = () => {
  const [createRoom, { loading }] = useMutation(CREATE_ROOM);

  const form = useForm<FormFields>({
    initialValues: {
      name: "",
      invitedUsers: [],
    },
    validationSchema,
    async onSubmit(values) {
      await createRoom({
        variables: {
          input: {
            name: values.name,
            usersInvitedIds: values.invitedUsers.map((user) => user.id),
          },
        },
      });
    },
  });

  return (
    <FormProvider form={form}>
      <form onSubmit={form.handleSubmit}>
        <div>
          <Input placeholder="Room name" type="text" error={form.hasErrors("name")} {...form.getFieldProps("name")} />
          <ErrorMessages errors={form.getErrors("name")} />
        </div>

        <InviteMembers />
        <div className="mt-4">
          <Button type="submit" fullWidth isLoading={loading}>
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateRoomForm;
