import { useMemo } from "react";
import { useFormContext } from "@/shared/lib/form";
import { AvatarWithActions } from "@/shared/ui";
import { useCrop } from "@/shared/crop";

const EditMyProfilePicture = () => {
  const form = useFormContext();

  const profilePicture = form.getValue("profilePicture");

  const crop = useCrop();

  const avatarActions = useMemo(() => {
    const result = [];

    const removeAction = {
      label: "Remove",
      color: "danger",
      onClick: () => {
        form.setValue("profilePicture", null);
      },
    };

    const replaceAction = {
      label: "Replace",
      onClick: async () => {
        const croppedImage = await crop.upload();

        form.setValue("profilePicture", croppedImage);
      },
    };

    const uploadAction = {
      label: "Upload",
      onClick: async () => {
        const croppedImage = await crop.upload();

        form.setValue("profilePicture", croppedImage);
      },
    };

    if (profilePicture) {
      result.push(removeAction);
      result.push(replaceAction);
    } else {
      result.push(uploadAction);
    }

    return result;
  }, [profilePicture, crop]);

  const src = useMemo(() => {
    if (profilePicture) {
      return URL.createObjectURL(profilePicture);
    }

    return null;
  }, [profilePicture]);

  return <AvatarWithActions src={src} actions={avatarActions} size="lg" disabled={form.isSubmitting} />;
};

export default EditMyProfilePicture;
