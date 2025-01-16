import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ComponentProps } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTypedDispatch } from "../../../../shared/hooks";
import { profileActions } from "../../../../shared/store";
import { useDidUpdateEffect } from "../../../../shared/hooks";

type Inputs = {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
};

const validationSchema = yup.object({
  old_password: yup.string().required().min(3).max(20),
  new_password: yup.string().required().min(3).max(20),
  new_password_repeat: yup.string().required().min(3).max(20),
});

type Props = {
  isOpen: ComponentProps<typeof Modal>["isOpen"];
  onClose: ComponentProps<typeof Modal>["onClose"];
};

const ResetPasswordModal = ({ isOpen, onClose }: Props) => {
  const form = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  useDidUpdateEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen]);

  const dispatch = useTypedDispatch();

  const handleError = (e) => {
    switch (e.response.data.error_type) {
      case "auth/incorrect_old_password":
        form.setError("old_password", { message: "Old password is incorrect" });
        break;
    }
  };

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(profileActions.resetPassword(data)).unwrap();

      onClose();
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="resetPassword" onSubmit={form.handleSubmit(handleSubmit)}>
            <Input
              placeholder="Old password"
              isInvalid={!!form.formState.errors.old_password}
              {...form.register("old_password")}
            />
            {form.formState.errors.old_password?.message}
            <Input
              className="mt-[5px]"
              placeholder="New password"
              isInvalid={!!form.formState.errors.new_password}
              {...form.register("new_password")}
            />
            {form.formState.errors.new_password?.message}
            <Input
              className="mt-[5px]"
              placeholder="Repeat old password"
              isInvalid={!!form.formState.errors.new_password_repeat}
              {...form.register("new_password_repeat")}
            />
            {form.formState.errors.new_password_repeat?.message}
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="ml-[10px]"
            colorScheme="blue"
            type="submit"
            form="resetPassword"
            isLoading={form.formState.isSubmitting}
          >
            Reset
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
