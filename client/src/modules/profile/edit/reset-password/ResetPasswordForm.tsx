import { useId, useState } from "react";
import * as yup from "yup";
import { IconButton, Modal, Button, Input, type ModalActions, useToast } from "@/shared/ui";
import { HiOutlinePencil } from "react-icons/hi2";
import useGetMeQuery from "../gql/useGetMeQuery.ts";
import useResetPasswordMutation from "../gql/useResetPasswordMutation.ts";
import { useForm } from "@/shared/lib/form";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";

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

const ResetPasswordForm = () => {
  const [showModal, setShowModal] = useState(false);

  const toast = useToast();

  const queries = {
    me: useGetMeQuery(),
  };
  const mutations = {
    resetPassword: useResetPasswordMutation(),
  };

  const form = useForm<Values>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    },
    validationSchema,
    async onSubmit(values) {
      await mutations.resetPassword.mutate({
        variables: { input: { ...values } },
        onCompleted() {
          toast.success("Password reset successfully");
          setShowModal(false);
        },
      });
    },
  });

  const formId = useId();

  const handleCancel = () => {
    setShowModal(false);
    form.reset();
  };

  const modalActions: ModalActions = [
    <Button type="button" color="light" disabled={mutations.resetPassword.loading} onClick={handleCancel}>
      Cancel
    </Button>,
    <Button type="submit" form={formId} isLoading={mutations.resetPassword.loading}>
      Edit
    </Button>,
  ];

  return (
    <>
      <div className="mt-6 flex items-end gap-2">
        <div className="flex-grow">
          <Input label="Password" value={new Array(queries.me.data!.me.passwordLength).fill("*").join("")} disabled />
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

        <ApolloErrorDisplay error={mutations.resetPassword.error} />
      </Modal>
    </>
  );
};

export default ResetPasswordForm;
