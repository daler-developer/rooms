import { useForm, FormProvider } from "@/shared/lib/form";
import * as yup from "yup";
import { Button, Input } from "@/shared/ui";
import { profilePictureRepository } from "@/global/superbase/repository";
import { REGISTER } from "../gql/tags.ts";
import { ApolloErrorDisplay, useCustomMutation } from "@/shared/lib/graphql";
import RegisterFormEmailInput from "./RegisterFormEmailInput.tsx";
import RegisterFormProfilePictureUpload from "./RegisterFormProfilePictureUpload.tsx";
import { SupabaseErrorDisplay, useSupabaseOperation } from "@/global/superbase";
import { RegisterFromValues } from "../types";
import { RegisterInput } from "@/__generated__/graphql.ts";
import { buildRoutePath } from "@/shared/lib/router";
import { Link } from "react-router-dom";

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
      const registerInput = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      } as RegisterInput;

      if (values.profilePicture) {
        const profilePictureUrl = await supabaseAddOneProfilePicture.run(values.profilePicture!);

        registerInput.profilePictureUrl = profilePictureUrl;
      }

      await mutations.register.mutate({
        variables: {
          input: registerInput,
        },
        onCompleted(data) {
          localStorage.setItem("token", data.register.token);
          window.location.reload();
          window.location.href = buildRoutePath.HOME();
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
              <Input type="password" label="Password" {...getFieldProps()} errors={errors} />
            </div>
          ))}
          {form.renderField("passwordRepeat", ({ getFieldProps, errors }) => (
            <div>
              <Input type="password" label="Repeat password" {...getFieldProps()} errors={errors} />
            </div>
          ))}

          <RegisterFormProfilePictureUpload />

          <div className="mt-2">
            <Button isLoading={form.isSubmitting} fullWidth type="submit">
              Register
            </Button>
          </div>
          <ApolloErrorDisplay className="mt-1" error={mutations.register.error} />
          <SupabaseErrorDisplay error={supabaseAddOneProfilePicture.error} />
          <Link to={buildRoutePath.LOGIN()} className="block mt-2 text-[14px] text-blue-600 text-center hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
