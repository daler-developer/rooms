import { ProfileCard } from "@/modules/profile/profile-card";
import { MyRooms } from "@/widgets/my-rooms";
import { CreateRoomButton } from "@/features/create-room";
import BaseTab from "./BaseTab";
import { Dropdown, IconButton } from "@/shared/ui";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useLogout } from "@/modules/auth";

const MainTab = () => {
  const logout = useLogout();

  return (
    <BaseTab
      headerLeft={<ProfileCard />}
      headerRight={
        <Dropdown
          placement="bottom-right"
          trigger={
            <div>
              <IconButton Icon={HiMiniEllipsisVertical} color="light" type="button" />
            </div>
          }
          items={[
            {
              label: "Profile",
              onClick: () => {},
            },
            {
              label: "Logout",
              onClick: () => {
                logout();
              },
              color: "danger",
            },
          ]}
        />
      }
    >
      <div>
        <MyRooms />

        <div className="absolute bottom-4 right-4">
          <CreateRoomButton />
        </div>
      </div>
    </BaseTab>
  );
};

export default MainTab;
