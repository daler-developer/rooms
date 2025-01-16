import BaseTab from "./BaseTab";
import { EditProfileForm } from "@/modules/profile/edit-profile";

const ProfileTab = () => {
  return (
    <BaseTab headerLeft={<div>profile</div>} headerRight={null}>
      <div className="p-2">
        <EditProfileForm />
      </div>
    </BaseTab>
  );
};

export default ProfileTab;
