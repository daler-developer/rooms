import { createContext, ReactNode } from "react";

export const FormContext = createContext<any>(null);

type Props = {
  children: ReactNode;
  form: any;
};

export const FormProvider = ({ children, form }: Props) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};
