import * as yup from "yup";
import { Button, Input } from "../../../shared/ui";
import { useForm } from "../../../shared/lib/forms";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
});

const LoginForm = () => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit(values) {
      console.log("submit", values);
    },
  });

  return (
    <form className="max-w-[500px] w-full" onSubmit={form.handleSubmit}>
      <div>hello World</div>
      {/*<Heading as="h1" className="text-center">*/}
      {/*  Login*/}
      {/*</Heading>*/}

      <div className="mt-[10px] flex flex-col gap-[10px]">
        <Input placeholder="Username" type="text" {...form.getFieldProps("username")} />
        <Input placeholder="Password" type="password" {...form.getFieldProps("password")} />
      </div>

      <Button type="submit" className="w-full mt-[20px]" isLoading={form.isSubmitting}>
        Login
      </Button>

      {/*<ChakraLink as={RouterLink} to="/register" className="mt-[10px] block">*/}
      {/*  Don't have an account? Register*/}
      {/*</ChakraLink>*/}
    </form>
  );
};

export default LoginForm;
