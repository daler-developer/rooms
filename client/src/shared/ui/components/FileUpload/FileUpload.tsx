import { ChangeEvent, useRef } from "react";

type Props = {
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
};

const FileUpload = ({ multiple = false, onUpload }: Props) => {
  const filesInputRef = useRef<HTMLInputElement>(null!);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);

    if (files.length) {
      onUpload?.(files);
    }
  };

  return (
    <>
      <div
        onClick={() => filesInputRef.current.click()}
        className="w-full h-[100px] border text-blue-400 border-blue-400 border-dashed rounded-md flex items-center justify-center cursor-pointer"
      >
        Upload
      </div>

      <input hidden type="file" ref={filesInputRef} multiple={multiple} onChange={handleChange} />
    </>
  );
};

export default FileUpload;
