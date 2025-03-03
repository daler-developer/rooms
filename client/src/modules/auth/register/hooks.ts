import { useFormContext } from "@/shared/lib/form";
import { RegisterFromValues } from "./types";

export const useRegisterForm = () => {
  return useFormContext<RegisterFromValues>();
};
