import { useForm, FormProvider } from "@/shared/lib/form";
import * as yup from "yup";
import { Button, Input } from "@/shared/ui";
import { profilePictureRepository } from "@/global/superbase/repository";
import { REGISTER } from "../gql/tags.ts";
import { Errors, useCustomMutation } from "@/shared/lib/graphql";
import RegisterFormEmailInput from "./RegisterFormEmailInput.tsx";
import RegisterFormProfilePictureUpload from "./RegisterFormProfilePictureUpload.tsx";
import { SupabaseErrorMessage, useSupabaseOperation } from "@/global/superbase";
import { RegisterFromValues } from "../types";

const validationSchema = yup.object({
  email: yup.string().email().required().min(3),
  firstName: yup.string().required().min(3).max(255),
  lastName: yup.string().required().min(3).max(255),
  password: yup.string().required().min(3).max(255),
  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});

const RegisterForm = () => {
  const mutations = {
    register: useCustomMutation(REGISTER),
  };
  const supabaseAddOneProfilePicture = useSupabaseOperation(async (file: File) => {
    return await profilePictureRepository.addOne({ file });
  });

  const form = useForm<RegisterFromValues>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordRepeat: "",
      profilePicture: null,
    },
    validationSchema,
    async onSubmit(values) {
      const payload = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      };

      if (values.profilePicture) {
        const url = await supabaseAddOneProfilePicture.run(values.profilePicture!);

        payload.profilePictureUrl = url;
      }

      await mutations.register.mutate({
        variables: {
          input: payload,
        },
        onCompleted(data) {
          localStorage.setItem("token", data.register.token);
          window.location.reload();
        },
      });
    },
  });

  return (
    <FormProvider form={form}>
      <form className="max-w-[400px] w-full" onSubmit={form.handleSubmit}>
        <h1 className="text-center font-bold text-3xl">Register</h1>
        <div className="mt-4 flex flex-col gap-1">
          <RegisterFormEmailInput />

          {form.renderField("firstName", ({ getFieldProps, errors }) => (
            <div>
              <Input label="First name" {...getFieldProps()} errors={errors} />
            </div>
          ))}
          {form.renderField("lastName", ({ getFieldProps, errors }) => (
            <div>
              <Input label="Last name" {...getFieldProps()} errors={errors} />
            </div>
          ))}
          {form.renderField("password", ({ getFieldProps, errors }) => (
            <div>
              <Input label="Password" {...getFieldProps()} errors={errors} />
            </div>
          ))}
          {form.renderField("passwordRepeat", ({ getFieldProps, errors }) => (
            <div>
              <Input label="Repeat password" {...getFieldProps()} errors={errors} />
            </div>
          ))}

          <RegisterFormProfilePictureUpload />

          <div className="mt-2">
            <Button isLoading={form.isSubmitting} fullWidth type="submit">
              Register
            </Button>
          </div>
          <Errors className="mt-1" error={mutations.register.error} />
          <SupabaseErrorMessage error={supabaseAddOneProfilePicture.error} />
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
