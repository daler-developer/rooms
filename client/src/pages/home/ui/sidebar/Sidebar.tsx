import { ComponentType, useMemo, useState } from "react";
import MainTab from "./MainTab";
import ProfileTab from "./ProfileTab";

type Tab = "main" | "invitations" | "profile";

const Sidebar = () => {
  const [currentTab, setCurrentTab] = useState<Tab>("profile");

  const ComponentByCurrentTab = useMemo(() => {
    const map: Record<Tab, ComponentType> = {
      main: MainTab,
      invitations: ProfileTab,
      profile: ProfileTab,
    };

    return map[currentTab];
  }, [currentTab]);

  return (
    <div className="fixed top-0 left-0 bottom-0 w-[400px] border">
      <ComponentByCurrentTab />
    </div>
  );
};

export default Sidebar;
