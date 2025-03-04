import { useFormContext } from "@/shared/lib/form";
import { FormValues } from "./types";

const useCreateRoomForm = () => {
  return useFormContext<FormValues>();
};

export { useCreateRoomForm };
