import { useLayoutEffect } from "react";
import { supabaseClient } from "@/shared/lib/superbase";
import { useRoomChatStore } from "@/widgets/room-chat/context";
import { v4 as uuid } from "uuid";
import { HiX } from "react-icons/hi";
import { IconButton, Spinner } from "@/shared/ui";

type Props = {
  imageKey: string;
};

const SendMessageFormUploadedImage = ({ imageKey }: Props) => {
  const { images, removeImage, setImageUrl, setImageIsLoading } = useRoomChatStore();

  const image = images.find((image) => image.key === imageKey)!;

  useLayoutEffect(() => {
    let ignore = false;

    (async () => {
      setImageIsLoading(imageKey, true);

      const imageName = uuid();

      const { data } = await supabaseClient.storage.from("message_files").upload(imageName, image.fileObject);

      if (ignore) {
        return;
      }

      if (data) {
        const { publicUrl } = supabaseClient.storage.from("message_files").getPublicUrl(imageName).data;

        setImageUrl(imageKey, publicUrl);
      }

      setImageIsLoading(imageKey, false);
    })();

    return () => {
      ignore = true;
      setImageIsLoading(imageKey, false);
    };
  }, [imageKey, image.fileObject, setImageUrl, setImageIsLoading]);

  const getImageUrl = () => {
    return URL.createObjectURL(image.fileObject) as string;
  };

  const handleRemove = () => {
    removeImage(imageKey);
  };

  return (
    <div className="w-[150px] h-[150px] shrink-0 border rounded-md relative">
      <img className="w-full h-full" src={getImageUrl()} />

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

export default SendMessageFormUploadedImage;
