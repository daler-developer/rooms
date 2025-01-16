import { ChangeEvent, useRef } from "react";

type Props = {
  multiple?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Upload = ({ multiple = false, onChange }: Props) => {
  const filesInputRef = useRef<HTMLInputElement>(null!);

  return (
    <>
      <div
        onClick={() => filesInputRef.current.click()}
        className="w-[100px] h-[100px] border text-blue-400 border-blue-400 border-dashed rounded-md flex items-center justify-center cursor-pointer"
      >
        Upload
      </div>

      <input
        hidden
        type="file"
        ref={filesInputRef}
        multiple={multiple}
        onChange={onChange}
      />
    </>
  );
};

export default Upload;
