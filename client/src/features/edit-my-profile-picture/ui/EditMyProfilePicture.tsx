import { useMutation, useQuery } from "@apollo/client";
import { useRef } from "react";
import { supabaseClient } from "@/shared/lib/superbase";
import { v4 as uuidv4 } from "uuid";

import { GET_ME, REMOVE_AVATAR, UPLOAD_PROFILE_PICTURE } from "../gql";
import Avatar, { type AvatarActions } from "@/shared/ui/components/Avatar/Avatar.tsx";

import ProfilePictureCropperModal from "./ProfilePictureCropperModal.tsx";

const EditMyProfilePicture = () => {
  const getMeQuery = useQuery(GET_ME);

  const imageCropper = useRef<typeof ProfilePictureCropperModal>(null!);
  const fileInput = useRef<HTMLInputElement>(null!);

  const [uploadProfilePictureMutate, { loading: isUploadingProfilePictureMutating }] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [removeMyAvatar, { loading: isRemovingMyAvatar }] = useMutation(REMOVE_AVATAR);

  const getAvatarActions = (): AvatarActions => {
    const hasAvatar = Boolean(getMeQuery.data!.me.profilePictureUrl);

    if (hasAvatar) {
      return [
        {
          label: "Remove",
          color: "danger",
          onClick: () => {
            removeMyAvatar();
          },
          isLoading: isRemovingMyAvatar,
        },
        {
          label: "Replace",
          onClick: () => {
            fileInput.current.click();
          },
        },
      ];
    } else {
      return [
        {
          label: "Upload",
          onClick: () => {
            fileInput.current.click();
          },
        },
      ];
    }
  };

  if (getMeQuery.loading) {
    return null;
  }

  if (getMeQuery.error) {
    return "error";
  }

  return (
    <div>
      <Avatar src={getMeQuery.data!.me.profilePictureUrl || undefined} actions={getAvatarActions()} size="lg" />

      <input
        hidden
        type="file"
        ref={fileInput}
        onChange={async (e) => {
          const file = Array.from(e.target.files!)[0];

          const croppedImageFile = await imageCropper.current.open(file);

          if (croppedImageFile) {
            const fileName = uuidv4() + ".png";

            const { data, error } = await supabaseClient.storage.from("profile_images").upload(fileName, croppedImageFile);

            const { publicUrl } = supabaseClient.storage.from("profile_images").getPublicUrl(fileName).data;

            if (data) {
              uploadProfilePictureMutate({
                variables: {
                  input: {
                    profilePictureUrl: publicUrl,
                  },
                },
              });
            }
          }
        }}
      />

      <ProfilePictureCropperModal ref={imageCropper} title="Profile picture" />
    </div>
  );
};

export default EditMyProfilePicture;
