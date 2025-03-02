import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { GET_ME, REMOVE_AVATAR, UPLOAD_PROFILE_PICTURE, EDIT_FIRST_NAME, EDIT_LAST_NAME } from "./gql/tags.ts";
import EditMyProfilePicture from "./edit-profile-picture/EditMyProfilePicture.tsx";
import { Button } from "@/shared/ui";
import { useForm, FormProvider } from "@/shared/lib/form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import EditFirstName from "./edit-first-name/EditFirstName.tsx";
import EditLastName from "./edit-last-name/EditLastName.tsx";
import { supabaseClient } from "@/shared/lib/superbase";
import { v4 as uuidv4 } from "uuid";
import EditMyPasswordForm from "./reset-password/ui/EditMyPasswordForm.tsx";

async function getFileFromUrl(url, filename) {
  try {
    const response = await fetch(url, {
      mode: "cors", // Ensure CORS is handled
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();

    // If filename is not provided, attempt to extract it from the URL
    if (!filename) {
      const urlParts = url.split("/");
      filename = urlParts[urlParts.length - 1].split("?")[0]; // Remove query params if any
    }

    // Attempt to get the MIME type from the Blob, fallback to default if necessary
    const mimeType = blob.type || "application/octet-stream";

    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error("Error converting URL to File:", error);
    throw error;
  }
}

const validationSchema = yup.object({});

const EditProfileForm = ({ profilePictureFile }: { profilePictureFile: File | null }) => {
  const queries = {
    me: useQuery(GET_ME),
  };

  const [uploadProfilePictureMutate] = useMutation(UPLOAD_PROFILE_PICTURE);
  const [removeMyAvatar] = useMutation(REMOVE_AVATAR);
  const [editFirstName] = useMutation(EDIT_FIRST_NAME);
  const [editLastName] = useMutation(EDIT_LAST_NAME);

  const form = useForm({
    resetAfterSubmit: false,
    initialValues: {
      profilePicture: profilePictureFile,
      firstName: queries.me.data!.me.firstName,
      lastName: queries.me.data!.me.lastName,
    },
    validationSchema,
    async onSubmit(values) {
      if (form.isEdited("firstName")) {
        await editFirstName({
          variables: {
            firstName: values.firstName,
          },
        });
      }

      if (form.isEdited("lastName")) {
        await editLastName({
          variables: {
            lastName: values.lastName,
          },
        });
      }

      if (form.isEdited("profilePicture")) {
        if (values.profilePicture) {
          const fileName = uuidv4();

          const { data } = await supabaseClient.storage.from("profile_images").upload(fileName, values.profilePicture);

          const { publicUrl } = supabaseClient.storage.from("profile_images").getPublicUrl(fileName).data;

          if (data) {
            await uploadProfilePictureMutate({
              variables: {
                input: {
                  profilePictureUrl: publicUrl,
                },
              },
            });
          }
        } else {
          await removeMyAvatar();
        }
      }

      form.setInitialValues(values);
    },
  });

  return (
    <FormProvider form={form}>
      <form className="relative h-full" onSubmit={form.handleSubmit}>
        <div className="text-center">
          <EditMyProfilePicture />
        </div>
        <div className="mt-6">
          <EditFirstName />
        </div>
        <div className="mt-6">
          <EditLastName />
        </div>
        <div className="mt-6">
          <EditMyPasswordForm />
        </div>

        {form.isEdited() && (
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-1">
            <div>
              <Button disabled={form.isSubmitting} fullWidth type="button" color="light" onClick={() => form.reset()}>
                Cancel
              </Button>
            </div>

            <div>
              <Button isLoading={form.isSubmitting} fullWidth type="submit">
                Edit
              </Button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

const EditProfileFormWrapper = () => {
  const [isReady, setIsReady] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

  const queries = {
    me: useQuery(GET_ME),
  };

  useEffect(() => {
    (async () => {
      if (queries.me.networkStatus === NetworkStatus.ready) {
        if (queries.me.data!.me.profilePictureUrl) {
          const file = await getFileFromUrl(queries.me.data!.me.profilePictureUrl, "test.png");
          setProfilePictureFile(file);
        }

        setIsReady(true);
      }
    })();
  }, [queries.me.networkStatus]);

  if (!isReady) {
    return null;
  }

  return <EditProfileForm profilePictureFile={profilePictureFile} />;
};

export default EditProfileFormWrapper;
