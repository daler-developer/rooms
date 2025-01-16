import { useEffect, useState } from "react";
import { Input, Button, Heading, Link as ChakraLink, Spinner } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import { useDebouncedValue } from "@/shared/hooks";
import * as api from "../api/index";

type Inputs = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_repeat: string;
};

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(20),
  first_name: yup.string().required().min(3).max(20),
  last_name: yup.string().required().min(3).max(20),
  password: yup.string().required().min(3).max(20),
  password_repeat: yup.string().required().min(3).max(20),
});

const LoginForm = () => {
  const form = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      password_repeat: "",
      username: "",
    },
  });

  const [checkedUsernameExistence, setCheckedUsernameExistence] = useState(false);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const username = form.watch("username");

  const debouncedUsername = useDebouncedValue<string>(username);

  useEffect(() => {
    setCheckedUsernameExistence(false);
  }, [username]);

  useEffect(() => {
    if (debouncedUsername.length >= 3) {
      // eslint-disable-next-line
      checkUsername();
    }
  }, [debouncedUsername]);

  const checkUsername = async () => {
    setIsChecking(true);

    const response = await api.checkUsernameExists(debouncedUsername);

    const usernameAlreadyExists = response.data.exists;

    if (usernameAlreadyExists) {
      setUsernameAlreadyExists(true);
    }

    setCheckedUsernameExistence(true);
    setIsChecking(false);
  };

  const handleSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <form className="max-w-[500px] w-full" onSubmit={form.handleSubmit(handleSubmit)}>
      <Heading as="h1" className="text-center">
        Register
      </Heading>

      <div className="mt-[10px] flex flex-col gap-[10px]">
        <Input placeholder="Username" {...form.register("username")} isInvalid={!!form.formState.errors.username} />
        {isChecking && <Spinner />}

        {!isChecking && checkedUsernameExistence && usernameAlreadyExists && <span>Username already exists</span>}

        {!isChecking && checkedUsernameExistence && !usernameAlreadyExists && <span>Free</span>}
        <Input placeholder="First name" {...form.register("first_name")} isInvalid={!!form.formState.errors.first_name} />
        <Input placeholder="Username" {...form.register("last_name")} isInvalid={!!form.formState.errors.last_name} />
        <Input placeholder="Password" type="password" {...form.register("password")} isInvalid={!!form.formState.errors.password} />
        <Input type="password" placeholder="Repeat password" {...form.register("password_repeat")} isInvalid={!!form.formState.errors.password_repeat} />
      </div>

      <Button type="submit" className="w-full mt-[20px]">
        Register
      </Button>

      <ChakraLink as={RouterLink} to="/login" className="mt-[10px] block">
        Already have an account? Login
      </ChakraLink>
    </form>
  );
};

export default LoginForm;
