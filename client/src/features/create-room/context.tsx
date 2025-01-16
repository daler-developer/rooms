import { createContext, ReactNode, useContext, useId } from "react";
import { CreateRoomStoreProvider, useCreateRoomStore } from "@/features/create-room/store.ts";
import { FormProvider, useFormContext } from "@/shared/lib/form";
import { FormValues } from "./types";

const CreateRoomContext = createContext();

type Props = {
  children: ReactNode;
};

export const CreateRoomContextProvider = ({ children }: Props) => {
  const formId = useId();

  const form = useFormContext<FormValues>();

  const store = useCreateRoomStore();

  const value = {
    formId,
    store,
    form,
  };

  return <CreateRoomContext.Provider value={value}>{children}</CreateRoomContext.Provider>;
};

export const useCreateRoomContext = () => useContext(CreateRoomContext);
