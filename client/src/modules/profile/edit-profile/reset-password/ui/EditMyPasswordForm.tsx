import { useId, useState } from "react";
import * as yup from "yup";
import { IconButton, Modal, Button, Input } from "@/shared/ui";
import { useMutation, useQuery } from "@apollo/client";
import { HiOutlinePencil } from "react-icons/hi2";
import { RESET_PASSWORD } from "../gql";
import { GET_ME } from "../../gql/tags.ts";
import { ErrorMessages, useForm } from "@/shared/lib/legacy-form";
import { ERROR_CODE, formatGraphqlErrors } from "@/shared/lib/graphql";

const validationSchema = yup.object({
  oldPassword: yup.string().required().min(3).max(20),
  newPassword: yup.string().required().min(3).max(20),
  newPasswordRepeat: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const EditMyPasswordForm = () => {
  const [showModal, setShowModal] = useState(false);

  const getMeQuery = useQuery(GET_ME);

  const [editMyPassword, { loading: isEditingMyPassword }] = useMutation(RESET_PASSWORD);

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
    validationSchema,
    async onSubmit(values) {
      await editMyPassword({
        variables: { input: { ...values } },
        onError(error) {
          const errors = formatGraphqlErrors(error.graphQLErrors);

          if (ERROR_CODE.INCORRECT_PASSWORD in errors) {
            form.setErrors("oldPassword", ["Incorrect password"]);
          }
        },
        onCompleted() {
          setShowModal(false);
        },
      });
    },
  });

  const formId = useId();

  if (getMeQuery.loading) {
    return null;
  }

  if (getMeQuery.error) {
    return "error";
  }

  const handleCancel = () => {
    setShowModal(false);
    form.reset();
  };

  const modalActions = [
    <Button type="button" color="light" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button type="submit" form={formId} isLoading={isEditingMyPassword}>
      Edit
    </Button>,
  ];

  return (
    <>
      <div className="mt-6 flex items-center gap-2">
        <div className="flex-grow">
          <Input value={new Array(getMeQuery.data!.me.passwordLength).fill("*").join("")} disabled />
        </div>
        <IconButton type="button" color="light" Icon={HiOutlinePencil} onClick={() => setShowModal(true)} />
      </div>

      <Modal title="Password" actions={modalActions} isOpen={showModal} onClose={() => setShowModal(false)}>
        <form id={formId} onSubmit={form.handleSubmit}>
          <div>
            <Input placeholder="Enter password" type="password" error={form.hasErrors("oldPassword")} {...form.getFieldProps("oldPassword")} />
            <ErrorMessages errors={form.getErrors("oldPassword")} />
          </div>

          <div className="mt-2">
            <Input placeholder="Enter password" type="password" error={form.hasErrors("newPassword")} {...form.getFieldProps("newPassword")} />
            <ErrorMessages errors={form.getErrors("newPassword")} />
          </div>

          <div className="mt-2">
            <Input
              placeholder="Enter password again"
              type="password"
              error={form.hasErrors("newPasswordRepeat")}
              {...form.getFieldProps("newPasswordRepeat")}
            />
            <ErrorMessages errors={form.getErrors("newPasswordRepeat")} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditMyPasswordForm;
