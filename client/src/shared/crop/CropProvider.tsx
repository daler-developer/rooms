import { createContext, ReactNode, useContext, useRef } from "react";

import CropImageModal, { type CropFileModalHandle } from "./ui/CropImageModal.tsx";

type Props = {
  children: ReactNode;
};

export type CropContextValue = {
  open(file: File): Promise<File>;
};

export const CropContext = createContext<CropContextValue>(null!);

export const useCrop = () => {
  return useContext(CropContext);
};

export const CropProvider = ({ children }: Props) => {
  const cropImageModalComp = useRef<CropFileModalHandle>(null!);

  const contextValue: CropContextValue = {
    async open(file) {
      return await cropImageModalComp.current.open(file);
    },
  };

  return (
    <>
      <CropContext.Provider value={contextValue}>{children}</CropContext.Provider>

      <CropImageModal ref={cropImageModalComp} />
    </>
  );
};
