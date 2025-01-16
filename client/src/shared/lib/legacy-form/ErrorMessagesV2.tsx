import { ReactNode } from "react";
import { UseForm } from "./useFormV2.ts";

type Props = {
  form: UseForm;
  children?: (errorMessages: string) => ReactNode;
};

const ErrorMessages = ({ children, form }: Props) => {
  const errorsList = form.getErrors();

  return children();
};

export default ErrorMessages;
