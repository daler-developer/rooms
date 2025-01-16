import { EditMyEmailForm } from "@/features/edit-my-email";
import { EditMyProfilePicture } from "@/features/edit-my-profile-picture";

const ProfilePage = () => {
  return (
    <div>
      <div>
        <EditMyProfilePicture />
      </div>

      <div className="mt-2">
        <EditMyEmailForm />
      </div>
    </div>
  );
};

export default ProfilePage;
