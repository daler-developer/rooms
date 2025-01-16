import MainTab from "./MainTab";
import ProfileTab from "./ProfileTab";
import InvitationsTab from "./InvitationsTab";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 w-[400px] border">
      <MainTab />
      <ProfileTab />
      <InvitationsTab />
    </div>
  );
};

export default Sidebar;
