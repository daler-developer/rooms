import { useRef } from "react";

type Props = {
  image: File;
  onRemove?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
};

const UploadedImage = ({ image, onRemove, onMoveLeft, onMoveRight }: Props) => {
  const url = useRef(URL.createObjectURL(image));

  const handleRemove = () => {
    onRemove?.();
  };

  return (
    <li className="relative">
      <img src={url.current} className="w-[100px] h-[100px]" />

      <button
        className="absolute top-0 right-0 w-[20px] h-[20px] bg-red-400 text-white"
        onClick={handleRemove}
      >
        x
      </button>

      <button
        type="button"
        className="absolute bottom-0 left-0 bg-black"
        onClick={() => onMoveLeft?.()}
      >
        L
      </button>

      <button
        type="button"
        className="absolute bottom-0 right-0 bg-black"
        onClick={() => onMoveRight?.()}
      >
        R
      </button>
    </li>
  );
};

export default UploadedImage;
