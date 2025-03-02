import { useContext } from "react";
import { FormContext } from "./FormProvider.tsx";
import { UseFormReturn } from "./useForm.ts";

const useFormContext = <TFields>() => {
  const form = useContext(FormContext);

  return form as UseFormReturn<TFields>;
};

export default useFormContext;
