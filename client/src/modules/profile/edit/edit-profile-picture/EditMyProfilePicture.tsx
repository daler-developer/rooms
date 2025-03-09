import { useMemo } from "react";
import { useFormContext } from "@/shared/lib/form";
import { Avatar, Dropdown, IconButton } from "@/shared/ui";
import { useCrop } from "@/shared/crop";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

const EditMyProfilePicture = () => {
  const form = useFormContext();

  const profilePicture = form.getValue("profilePicture");

  const crop = useCrop();

  const dropdownItems = useMemo(() => {
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

  const dropdown = (
    <Dropdown
      placement="bottom-right"
      items={dropdownItems}
      trigger={
        <div>
          <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
        </div>
      }
    />
  );

  return <Avatar src={src} badgeContent={dropdown} />;
};

export default EditMyProfilePicture;
