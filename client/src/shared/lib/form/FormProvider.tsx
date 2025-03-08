import { createContext, ReactNode } from "react";
import { UseFormReturn } from "./useForm";

export const FormContext = createContext<any>(null);

type Props<TValues> = {
  children: ReactNode;
  form: UseFormReturn<TValues>;
};

const FormProvider = <TValues,>({ children, form }: Props<TValues>) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export default FormProvider;
