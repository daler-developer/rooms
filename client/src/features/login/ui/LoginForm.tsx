import { useMutation } from "@apollo/client";
import { Alert, Button, Input } from "@/shared/ui";
import { ErrorMessages, useForm } from "@/shared/lib/legacy-form";
import { useState } from "react";
import * as yup from "yup";
// import { useMutation } from "@apollo/client";
import { LOGIN } from "../gql";
import { formatGraphqlErrors, ERROR_CODE } from "@/shared/lib/graphql";

const validationSchema = yup.object({
  email: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
});

const LoginForm = () => {
  const [showIsBlockedAlert, setShowIsBlockedAlert] = useState(false);

  const [login] = useMutation(LOGIN);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      // const loginResult = await login({
      //   input: {
      //     email: values.email,
      //     password: values.password,
      //   },
      // });
      //
      // console.log("loginResult.error", loginResult.error);
      // resetLoginMutation();
      setShowIsBlockedAlert(false);

      await login({
        variables: { input: { email: values.email, password: values.password } },
        onError(error) {
          const errors = formatGraphqlErrors(error.graphQLErrors);

          if (ERROR_CODE.ACCOUNT_IS_BLOCKED in errors) {
            setShowIsBlockedAlert(true);
          }
          if (ERROR_CODE.USER_NOT_FOUND in errors) {
            form.setErrors("email", ["User does not exist"]);
          }
          if (ERROR_CODE.INCORRECT_PASSWORD in errors) {
            form.setErrors("password", ["Incorrect password"]);
          }
        },
        onCompleted(data) {
          localStorage.setItem("token", data.login.token);
          window.location.reload();
          window.location.href = "/home";
        },
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <h1 className="text-center font-bold text-3xl">Login</h1>

      <div className="mt-2 flex flex-col gap-[10px]">
        <div>
          <Input placeholder="Username" type="text" error={form.hasErrors("email")} {...form.getFieldProps("email")} />
          <ErrorMessages errors={form.getErrors("email")} />
        </div>

        <div>
          <Input placeholder="Password" type="password" error={form.hasErrors("password")} {...form.getFieldProps("password")} />
          <ErrorMessages errors={form.getErrors("password")} />
        </div>
      </div>

      <div className="mt-6">
        <Button fullWidth type="submit" isLoading={form.isSubmitting}>
          Login
        </Button>
      </div>

      {showIsBlockedAlert && (
        <Alert severity="error" className="mt-2">
          Your account is blocked
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
