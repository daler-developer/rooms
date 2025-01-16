import { useQuery } from "@apollo/client";
import { GET_ME } from "./gql/tags.ts";
import EditMyProfilePicture from "./edit-profile-picture/EditMyProfilePicture.tsx";

const EditProfileForm = () => {
  const queries = {
    me: useQuery(GET_ME),
  };

  if (queries.me.loading) {
    return null;
  }

  if (queries.me.data) {
    return (
      <div>
        <div className="text-center">
          <EditMyProfilePicture />
        </div>
      </div>
    );
  }

  return null;
};

export default EditProfileForm;
