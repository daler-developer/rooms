import { ProfileCard } from "@/modules/profile/profile-card";
import { RoomsList } from "@/modules/room/list";
import BaseTab from "./BaseTab";
import { Dropdown, IconButton } from "@/shared/ui";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import { useLogout } from "@/modules/auth";
import useHomePageStore from "@/pages/home/store.ts";
import { InvitationsButton } from "@/modules/invitation/invitations-button";
import useRoomIdSearchParam from "../../useRoomIdSearchParam.ts";

const MainTab = () => {
  const { roomId, setRoomId } = useRoomIdSearchParam();
  const logout = useLogout();

  const sidebarTab = useHomePageStore.use.sidebarTab();
  const setSidebarTab = useHomePageStore.use.setSidebarTab();

  if (sidebarTab !== "main") {
    return null;
  }

  return (
    <BaseTab
      headerLeft={<ProfileCard />}
      headerRight={
        <div className="flex items-center gap-2">
          <InvitationsButton onClick={() => setSidebarTab("invitations")} />
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
                onClick: () => {
                  setSidebarTab("profile");
                },
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
        </div>
      }
    >
      <div className="h-full">
        <RoomsList
          selectedRoomId={roomId}
          onSelectedRoomIdChange={(newRoomId) => {
            setRoomId(newRoomId);
          }}
        />
      </div>
    </BaseTab>
  );
};

export default MainTab;
