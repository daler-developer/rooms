import { createContext, ReactNode, useContext, useRef } from "react";

import CropImageModal, { type CropFileModalHandle } from "./ui/CropImageModal.tsx";

type Props = {
  children: ReactNode;
};

export type CropContextValue = {
  open(file: File): Promise<File>;
  upload(): Promise<File>;
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
    async upload() {
      return new Promise((res) => {
        const input = document.createElement("input");

        input.type = "file";
        input.multiple = false;

        input.addEventListener("change", async (e) => {
          const image: File = Array.from((e.target as HTMLInputElement).files as FileList)[0] as File;

          if (image) {
            const croppedImage = await cropImageModalComp.current.open(image);

            res(croppedImage);
          }
        });

        document.body.append(input);
        input.click();
      });
    },
  };

  return (
    <>
      <CropContext.Provider value={contextValue}>{children}</CropContext.Provider>

      <CropImageModal ref={cropImageModalComp} />
    </>
  );
};
