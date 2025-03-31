import { ChangeEvent, ComponentProps, ReactElement, useMemo, useRef, cloneElement } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useToast } from "@/shared/ui";
import { fileMatchesAccept } from "./utils";
import useIsDragging from "../../hooks/useIsDragging";
import clsx from "clsx";

type Props = {
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  accept?: ComponentProps<"input">["accept"];
  label?: string;
  trigger?: ReactElement;
};

const FileUpload = ({ multiple = false, onUpload, accept, label, trigger }: Props) => {
  const isDragging = useIsDragging();

  const rootEl = useRef<HTMLDivElement>(null!);
  const filesInputRef = useRef<HTMLInputElement>(null!);

  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);

    if (files.length) {
      onUpload?.(files);
    }

    filesInputRef.current.value = "";
  };

  const formattedAcceptedTypes = useMemo(() => {
    if (!accept) {
      return `Accepted types: Images, Videos, Audio Files`;
    }

    const friendlyNamesMapping: Record<string, string> = {
      "image/*": "Images",
      "video/*": "Videos",
      "audio/*": "Audio Files",
    };

    const list = accept
      .split(",")
      .map((type) => type.trim())
      .filter(Boolean)
      .map((type) => {
        if (type in friendlyNamesMapping) {
          return friendlyNamesMapping[type];
        }

        return type;
      })
      .join(", ");

    return `Accepted types: ${list}`;
  }, [accept]);

  const isCustomTrigger = Boolean(trigger);

  if (isCustomTrigger) {
    return (
      <>
        {cloneElement(trigger!, {
          onClick: () => {
            filesInputRef.current.click();
          },
        })}

        <input hidden accept={accept} type="file" ref={filesInputRef} multiple={multiple} onChange={handleChange} />
      </>
    );
  }

  return (
    <>
      <div>
        {label && <label className={"block mb-[2px] text-[12px] pl-[4px] font-medium"}>{label}</label>}

        <div
          ref={rootEl}
          onClick={() => filesInputRef.current.click()}
          className={clsx(
            "w-full py-4 border text-blue-400 border-blue-400 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer",
            {
              "bg-gray-200 border-blue-700": isDragging,
              "bg-white border-blue-400": !isDragging,
            },
          )}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const files = Array.from(e.dataTransfer.files);

            if (!multiple && files.length > 1) {
              toast.error("Only 1 file!");

              return;
            }

            const allFilesMatchAccept = files.every((file) => fileMatchesAccept(file, accept));

            if (!allFilesMatchAccept) {
              toast.error("Unsupported file types");

              return;
            }

            onUpload?.(files);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <AiOutlineCloudUpload size={32} className="mb-2" />
          <span>Click to upload or drag and drop</span>
          <span className="mt-1 text-xs text-gray-500">{formattedAcceptedTypes}</span>
        </div>

        <input hidden accept={accept} type="file" ref={filesInputRef} multiple={multiple} onChange={handleChange} />
      </div>
    </>
  );
};

export default FileUpload;
