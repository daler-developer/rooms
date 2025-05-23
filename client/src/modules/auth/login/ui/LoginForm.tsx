import * as yup from "yup";
import { Button, Input } from "@/shared/ui";
import { useForm } from "@/shared/lib/form";
import { LOGIN } from "../gql";
import { ApolloErrorDisplay, useCustomMutation } from "@/shared/lib/graphql";
import { Link } from "react-router-dom";
import { buildRoutePath } from "@/shared/lib/router";

type Props = {
  onSuccess?: () => void;
};

const validationSchema = yup.object({
  email: yup.string().required().email().min(3).max(50),
  password: yup.string().required().min(3).max(20),
});

const LoginForm = ({ onSuccess }: Props) => {
  const mutations = {
    login: useCustomMutation(LOGIN),
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    async onSubmit(values) {
      await mutations.login.mutate({
        variables: { input: { email: values.email, password: values.password } },
        onCompleted(data) {
          localStorage.setItem("token", data.login.token);
          onSuccess?.();
        },
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <h1 className="text-center font-bold text-3xl">Login</h1>

      <div className="mt-2 flex flex-col gap-[10px]">
        {form.renderField("email", ({ getFieldProps, errors }) => (
          <div>
            <Input label="Email" type="text" errors={errors} {...getFieldProps()} />
          </div>
        ))}

        {form.renderField("password", ({ getFieldProps, errors }) => (
          <div>
            <Input label="Password" type="password" errors={errors} {...getFieldProps()} />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button fullWidth type="submit" isLoading={form.isSubmitting}>
          Login
        </Button>
      </div>

      <ApolloErrorDisplay className="mt-1" error={mutations.login.error} />

      <Link to={buildRoutePath.REGISTER()} className="block mt-2 text-[14px] text-blue-600 text-center hover:underline">
        Don't have an account? Register
      </Link>
    </form>
  );
};

export default LoginForm;
