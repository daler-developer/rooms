import { createContext, ReactNode, useContext, useId } from "react";
import { CreateRoomStoreProvider, useCreateRoomStore } from "@/features/create-room/store.ts";
import { FormProvider, useFormContext } from "@/shared/lib/form";

const CreateRoomContext = createContext();

type Props = {
  children: ReactNode;
  createRoomMutation: {
    isLoading: boolean;
  };
};

export const CreateRoomContextProvider = ({ children, createRoomMutation }: Props) => {
  const formId = useId();

  const form = useFormContext();

  const store = useCreateRoomStore();

  const value = {
    formId,
    store,
    form,
    createRoomMutation,
  };

  return <CreateRoomContext.Provider value={value}>{children}</CreateRoomContext.Provider>;
};

export const useCreateRoomContext = () => useContext(CreateRoomContext);
