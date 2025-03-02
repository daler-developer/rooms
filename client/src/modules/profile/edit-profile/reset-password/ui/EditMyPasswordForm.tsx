import { useId, useState } from "react";
import * as yup from "yup";
import { IconButton, Modal, Button, Input } from "@/shared/ui";
import { useMutation, useQuery } from "@apollo/client";
import { HiOutlinePencil } from "react-icons/hi2";
import { RESET_PASSWORD } from "../gql";
import { GET_ME } from "../../gql/tags.ts";
import { useForm } from "@/shared/lib/form";
import { formatGraphqlErrors } from "@/shared/lib/graphql";

const validationSchema = yup.object({
  oldPassword: yup.string().required().min(3).max(20),
  newPassword: yup.string().required().min(3).max(20),
  newPasswordRepeat: yup.string().oneOf([yup.ref("newPassword")], "Passwords must match"),
});

type Values = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

const EditMyPasswordForm = () => {
  const [showModal, setShowModal] = useState(false);

  const getMeQuery = useQuery(GET_ME);

  const [editMyPassword, { loading: isEditingMyPassword }] = useMutation(RESET_PASSWORD);

  const form = useForm<Values>({
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
      <div className="mt-6 flex items-end gap-2">
        <div className="flex-grow">
          <Input label="Password" value={new Array(getMeQuery.data!.me.passwordLength).fill("*").join("")} disabled />
        </div>
        <IconButton type="button" color="light" Icon={HiOutlinePencil} onClick={() => setShowModal(true)} />
      </div>

      <Modal title="Password" actions={modalActions} isOpen={showModal} onClose={() => setShowModal(false)}>
        <form id={formId} onSubmit={form.handleSubmit}>
          {form.renderField("oldPassword", ({ getFieldProps, errors }) => (
            <div>
              <Input label="Enter old password" type="password" errors={errors} {...getFieldProps()} />
            </div>
          ))}
          {form.renderField("newPassword", ({ getFieldProps, errors }) => (
            <div className="mt-2">
              <Input label="Enter new password" type="password" errors={errors} {...getFieldProps()} />
            </div>
          ))}
          {form.renderField("newPasswordRepeat", ({ getFieldProps, errors }) => (
            <div className="mt-2">
              <Input label="Enter new password again" type="password" errors={errors} {...getFieldProps()} />
            </div>
          ))}
        </form>
      </Modal>
    </>
  );
};

export default EditMyPasswordForm;
