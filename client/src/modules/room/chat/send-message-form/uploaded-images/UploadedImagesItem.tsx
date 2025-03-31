import { useLayoutEffect } from "react";
import { supabaseClient } from "@/shared/lib/superbase";
import { v4 as uuid } from "uuid";
import { HiX } from "react-icons/hi";
import { IconButton, Spinner } from "@/shared/ui";
import { useFormContext } from "@/shared/lib/form";
import { FormFields } from "../types";
import { useSupabaseOperation } from "@/global/superbase";
import { messageImageRepository } from "@/global/superbase/repository";

type Props = {
  imageKey: string;
};

const UploadedImagesItem = ({ imageKey }: Props) => {
  const form = useFormContext<FormFields>();

  const supabaseAddOneProfilePicture = useSupabaseOperation(messageImageRepository.addOne);

  const imageIndex = form.getValue("images").findIndex((image) => image.key === imageKey)!;
  const image = form.getValue("images")[imageIndex];

  useLayoutEffect(() => {
    let ignore = false;

    const uploadFile = async () => {
      form.setValue(`images.${imageIndex}.isLoading`, true);

      const publicUrl = await supabaseAddOneProfilePicture.run({ file: image.fileObject });

      form.setValue(`images.${imageIndex}.isLoading`, false);

      if (ignore) {
        return;
      }

      form.setValue(`images.${imageIndex}.imageUrl`, publicUrl);
    };

    uploadFile();

    return () => {
      ignore = true;
    };
  }, [imageIndex, image.fileObject]);

  const getImageUrl = () => {
    return URL.createObjectURL(image.fileObject) as string;
  };

  const handleRemove = () => {
    form.removeArrayItem("images", imageIndex);
  };

  return (
    <div className="w-[150px] h-[150px] shrink-0 border rounded-md relative">
      <img alt={image.fileObject.name} className="w-full h-full object-cover" src={getImageUrl()} />

      {!image.isLoading && (
        <div className="absolute top-0 right-0">
          <IconButton Icon={HiX} color="red" type="button" size="sm" onClick={handleRemove} />
        </div>
      )}

      {image.isLoading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-[0.8] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default UploadedImagesItem;
