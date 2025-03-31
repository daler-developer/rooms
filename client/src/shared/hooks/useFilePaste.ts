import { useEffect } from "react";
import { isAcceptedFile } from "@/shared/utils";

type Options = {
  onUpload?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
};

const useFilePaste = ({ onUpload, accept }: Options) => {
  useEffect(() => {
    const handler = (event: ClipboardEvent) => {
      event.preventDefault();

      const clipboardData = event.clipboardData!;

      if (clipboardData && clipboardData.files.length > 0) {
        const files = Array.from(clipboardData.files);
        const filteredFiles = files.filter((file) => {
          if (!accept) {
            return true;
          }
          return isAcceptedFile(file, accept);
        });
        if (filteredFiles.length > 0) {
          onUpload?.(filteredFiles);
        }
      }
    };

    window.addEventListener("paste", handler);

    return () => {
      window.removeEventListener("paste", handler);
    };
  }, [accept, onUpload]);
};

export default useFilePaste;
