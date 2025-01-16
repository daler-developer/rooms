import { useFormContext } from "@/shared/lib/form";
import { Avatar, Dropdown, FileUpload } from "@/shared/ui";
import { useMemo } from "react";
import { useCrop } from "@/shared/crop";
import IconButton from "../../../../shared/ui/components/IconButton/IconButton.tsx";
import { HiMiniEllipsisVertical } from "react-icons/hi2";

const RegisterFormProfilePictureUpload = () => {
  const form = useFormContext();

  const crop = useCrop();

  const profilePicture = form.getValue("profilePicture");

  const profilePictureUrl = useMemo(() => {
    if (!profilePicture) {
      return null;
    }

    return URL.createObjectURL(profilePicture);
  }, [profilePicture]);

  const handleUpload = async (files: File[]) => {
    const image = files[0]!;

    const croppedImage = await crop.open(image);

    form.setValue("profilePicture", croppedImage);
  };

  const dropdown = (
    <Dropdown
      items={[
        {
          label: "Remove",
          onClick() {
            form.setValue("profilePicture", null);
          },
        },
      ]}
      trigger={
        <div>
          <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
        </div>
      }
    />
  );

  if (profilePicture) {
    return (
      <div className="text-center">
        <Avatar src={profilePictureUrl} badgeContent={dropdown} />
      </div>
    );
  }

  return (
    <div>
      <FileUpload label="Profile picture" multiple={false} accept=".png, .jpg" onUpload={handleUpload} />
    </div>
  );
};

export default RegisterFormProfilePictureUpload;
