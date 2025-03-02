import { useFormContext } from "@/shared/lib/form";
import { FormValues } from "./types";

const useCreateRoomForm = () => {
  const form = useFormContext<FormValues>();

  return form;
};

export { useCreateRoomForm };
