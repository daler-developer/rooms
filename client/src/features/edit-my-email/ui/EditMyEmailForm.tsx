import { useLayoutEffect, useState } from "react";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { HiOutlinePencil } from "react-icons/hi2";

import { useForm, ErrorMessages } from "@/shared/lib/legacy-form";
import { Input, Button, IconButton, ClickOutside } from "@/shared/ui";
import { EMAIL_FORM_GET_ME, EDIT_MY_EMAIL } from "../gql";

const validationSchema = yup.object({
  newEmail: yup.string().required().email(),
});

const EditMyEmailForm = () => {
  const [showForm, setShowForm] = useState(false);

  const getMeQuery = useQuery(EMAIL_FORM_GET_ME);

  const [editMyEmail, { loading: isEditingMyEmail }] = useMutation(EDIT_MY_EMAIL);

  const form = useForm({
    initialValues: {
      newEmail: "",
    },
    validationSchema,
    async onSubmit(values) {
      await editMyEmail({
        variables: { input: { newEmail: values.newEmail } },
      });

      setShowForm(false);
    },
  });

  useLayoutEffect(() => {
    if (getMeQuery.data && showForm) {
      form.setValue("newEmail", getMeQuery.data.me.email);
    }
  }, [getMeQuery.data, showForm]);

  if (getMeQuery.loading) {
    return null;
  }

  if (getMeQuery.error) {
    return "error";
  }

  if (showForm) {
    return (
      <ClickOutside handler={() => setShowForm(false)}>
        <form onSubmit={form.handleSubmit}>
          <div className="flex items-center gap-2">
            <Input className="flex-grow" error={form.hasErrors("newEmail")} {...form.getFieldProps("newEmail")} />
            <Button type="submit" isLoading={isEditingMyEmail}>
              Submit
            </Button>
          </div>
          <ErrorMessages errors={form.getErrors("newEmail")} />
        </form>
      </ClickOutside>
    );
  }

  return (
    <div className="flex items-center gap-2 justify-between">
      <span className="font-bold">{getMeQuery.data!.me.email}</span>
      <IconButton color="light" type="button" isLoading={isEditingMyEmail} onClick={() => setShowForm(true)} Icon={HiOutlinePencil} />
    </div>
  );
};

export default EditMyEmailForm;
