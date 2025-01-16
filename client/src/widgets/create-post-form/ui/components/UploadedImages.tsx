import { ChangeEvent } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import UploadedImage from "./UploadedImage";
import { Inputs } from "./CreatePostForm";
import Upload from "../../../../shared/ui/components/Upload";

const UploadedImages = () => {
  const form = useFormContext<Inputs>();

  const images = form.watch("images");

  // const { fields, append } = useFieldArray({
  //   name: "images",
  //   control: form.control,
  // });

  const handleFilesUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;

    console.log(Array.from(files).map((file) => ({ ...file, id: Date.now() })));

    form.setValue("images", Array.from(files));
  };

  const handleRemove = (imageName: string) => {
    form.setValue(
      "images",
      form.getValues("images").filter((image) => image.name !== imageName),
    );
  };

  const handleMoveLeft = (imageName: string) => {};

  const handleMoveRight = (imageName: string) => {};

  return (
    <ul className="flex items-center gap-[10px] overflow-x-auto">
      {images.map((image) => (
        <UploadedImage
          key={image.name}
          image={image}
          onRemove={() => handleRemove(image.name)}
          onMoveLeft={() => handleMoveLeft(image.name)}
          onMoveRight={() => handleMoveRight(image.name)}
        />
      ))}
      <Upload multiple={true} onChange={handleFilesUploaded} />
    </ul>
  );
};

export default UploadedImages;
