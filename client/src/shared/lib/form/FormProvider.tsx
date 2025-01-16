import { createContext, ReactNode } from "react";
import useForm from "./useForm";

export const FormContext = createContext<ReturnType<typeof useForm<unknown>>>(null!);

type Props = {
  children: ReactNode;
  form: ReturnType<typeof useForm<unknown>>;
};

const FormProvider = ({ children, form }: Props) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export default FormProvider;
