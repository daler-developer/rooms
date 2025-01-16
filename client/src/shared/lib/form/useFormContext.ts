import { useContext } from "react";
import { FormContext } from "./FormProvider.tsx";
import useForm from "./useForm.ts";

const useFormContext = <TFields extends { [key: string]: any }>() => {
  return useContext<ReturnType<typeof useForm<TFields>>>(FormContext);
};

export default useFormContext;
