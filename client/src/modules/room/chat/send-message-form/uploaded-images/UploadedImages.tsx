import { Scroll } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";
import UploadedImagesItem from "./UploadedImagesItem.tsx";
import { Fields } from "../SendMessageForm.tsx";

const UploadedImages = () => {
  const form = useFormContext<Fields>();

  return (
    <div className="absolute bottom-[100%] left-0 right-0">
      <Scroll height={150}>
        <div className="flex w-full gap-2">
          {form.getValue("images").map((image) => (
            <UploadedImagesItem key={image.key} imageKey={image.key} />
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default UploadedImages;
