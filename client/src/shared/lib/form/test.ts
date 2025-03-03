import Form from "./Form";
import * as yup from "yup";

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

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordRepeat: "",
  profilePicture: null,
  inner: {
    foo: [],
  },
};

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
  profilePicture: File | null;
  inner: {
    foo: string[];
  };
};

const form = new Form<FormValues>({
  validationSchema,
  initialValues,
  onStateUpdated() {},
});

form.appendArrayItem("inner.foo", 23);
