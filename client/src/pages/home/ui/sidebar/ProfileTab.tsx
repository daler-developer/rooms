import BaseTab from "./BaseTab";
import { EditProfileForm } from "@/modules/profile/edit-profile";
import useHomePageStore from "@/pages/home/store.ts";
import { HiChevronLeft } from "react-icons/hi2";
import { IconButton } from "@/shared/ui";

const ProfileTab = () => {
  const sidebarTab = useHomePageStore.use.sidebarTab();
  const setSidebarTab = useHomePageStore.use.setSidebarTab();

  if (sidebarTab !== "profile") {
    return null;
  }

  return (
    <BaseTab
      headerLeft={
        <div className="flex items-center gap-3">
          <IconButton
            color="light"
            type="button"
            Icon={HiChevronLeft}
            onClick={() => {
              setSidebarTab("main");
            }}
          />
          <h2 className="text-xl font-medium">Profile</h2>
        </div>
      }
    >
      <div className="p-2 h-full">
        <EditProfileForm />
      </div>
    </BaseTab>
  );
};

export default ProfileTab;
