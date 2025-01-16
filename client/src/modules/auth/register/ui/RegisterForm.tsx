import { useForm } from "@/shared/lib/form";
import { v4 as uuidv4 } from "uuid";
import { supabaseClient } from "@/shared/lib/superbase";
import * as yup from "yup";
import { Button, Input, FileUpload, Avatar } from "@/shared/ui";
import { useCrop } from "@/shared/crop";
import { REGISTER } from "../gql/tags.ts";
import { useMutation } from "@apollo/client";

const validationSchema = yup.object({
  email: yup.string().required().min(3).max(100),
  firstName: yup.string().required().min(3).max(255),
  lastName: yup.string().required().min(3).max(255),
  password: yup.string().required().min(3).max(255),
});

const RegisterForm = () => {
  const [register, { loading: isRegisterLoading }] = useMutation(REGISTER);

  const form = useForm({
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
        const fileName = uuidv4();

        const { error } = await supabaseClient.storage.from("message_files").upload(fileName, values.profilePicture!);

        if (error) {
          alert("upload error");
        } else {
          const { publicUrl } = supabaseClient.storage.from("message_files").getPublicUrl(fileName).data;

          payload.profilePictureUrl = publicUrl;
        }
      }

      await register({
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

  const profilePicture = form.getValue("profilePicture");

  const crop = useCrop();

  const handleUpload = async (files: File[]) => {
    const image = files[0]!;

    const croppedImage = await crop.open(image);

    form.setValue("profilePicture", croppedImage);
  };

  return (
    <form className="max-w-[400px] w-full" onSubmit={form.handleSubmit}>
      <h1 className="text-center font-bold text-3xl">Register</h1>
      <div className="mt-4 flex flex-col gap-1">
        {form.renderField("email", ({ getFieldProps }) => (
          <div>
            <Input placeholder="Email" {...getFieldProps()} />
          </div>
        ))}
        {form.renderField("firstName", ({ getFieldProps }) => (
          <div>
            <Input placeholder="First name" {...getFieldProps()} />
          </div>
        ))}
        {form.renderField("lastName", ({ getFieldProps }) => (
          <div>
            <Input placeholder="Last name" {...getFieldProps()} />
          </div>
        ))}
        {form.renderField("password", ({ getFieldProps }) => (
          <div>
            <Input placeholder="Password" {...getFieldProps()} />
          </div>
        ))}
        {form.renderField("passwordRepeat", ({ getFieldProps }) => (
          <div>
            <Input placeholder="Repeat password" {...getFieldProps()} />
          </div>
        ))}

        {profilePicture ? (
          <div>
            <Avatar src={URL.createObjectURL(profilePicture)} />
          </div>
        ) : (
          <div>
            <FileUpload multiple={false} onUpload={handleUpload} />
          </div>
        )}

        <div className="mt-2">
          <Button isLoading={form.isSubmitting} fullWidth type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
