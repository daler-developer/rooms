import { NetworkStatus } from "@apollo/client";
import useEditFirstNameMutation from "./gql/useEditFirstNameMutation.ts";
import useEditLastNameMutation from "./gql/useEditLastNameMutation.ts";
import useEditProfilePictureMutation from "./gql/useEditProfilePictureMutation.ts";
import useGetMeQuery from "./gql/useGetMeQuery.ts";
import EditMyProfilePicture from "./edit-profile-picture/EditMyProfilePicture.tsx";
import { Button } from "@/shared/ui";
import { useForm, FormProvider } from "@/shared/lib/form";
import * as yup from "yup";
import { useEffect, useState } from "react";
import EditFirstName from "./edit-first-name/EditFirstName.tsx";
import EditLastName from "./edit-last-name/EditLastName.tsx";
import ResetPasswordForm from "./reset-password/ResetPasswordForm.tsx";
import { ApolloErrorDisplay } from "@/shared/lib/graphql";
import { SupabaseErrorDisplay } from "@/global/superbase";
import { profilePictureRepository } from "@/global/superbase/repository";

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
    me: useGetMeQuery(),
  };
  const mutations = {
    editProfilePicture: useEditProfilePictureMutation(),
    editFirstName: useEditFirstNameMutation(),
    editLastName: useEditLastNameMutation(),
  };

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
        await mutations.editFirstName.mutate({
          variables: {
            input: {
              newFirstName: values.firstName,
            },
          },
        });
      }

      if (form.isEdited("lastName")) {
        await mutations.editLastName.mutate({
          variables: {
            input: {
              newLastName: values.lastName,
            },
          },
        });
      }

      if (form.isEdited("profilePicture")) {
        if (values.profilePicture) {
          const profilePictureUrl = await profilePictureRepository.addOne({
            file: values.profilePicture,
          });

          await mutations.editProfilePicture.mutate({
            variables: {
              input: {
                profilePictureUrl,
              },
            },
          });
        } else {
          await mutations.editProfilePicture.mutate({
            variables: {
              input: {
                profilePictureUrl: null,
              },
            },
          });
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
          <ResetPasswordForm />
        </div>

        <ApolloErrorDisplay className="mt-2" error={mutations.editProfilePicture.error} />
        <ApolloErrorDisplay className="mt-2" error={mutations.editFirstName.error} />
        <ApolloErrorDisplay className="mt-2" error={mutations.editLastName.error} />
        <SupabaseErrorDisplay className="mt-2" />

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
    me: useGetMeQuery(),
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
