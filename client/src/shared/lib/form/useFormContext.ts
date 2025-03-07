import { useContext } from "react";
import { FormContext } from "./FormProvider.tsx";
import { UseFormReturn } from "./useForm.ts";

const useFormContext = <TFields extends { [key: string]: any }>() => {
  const form = useContext(FormContext);

  return form as UseFormReturn<TFields>;
};

export default useFormContext;
