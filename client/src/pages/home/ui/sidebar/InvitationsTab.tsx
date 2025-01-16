import BaseTab from "./BaseTab";
import { IconButton } from "@/shared/ui";
import { HiChevronLeft } from "react-icons/hi2";
import useHomePageStore from "@/pages/home/store.ts";
import { InvitationsList } from "@/modules/invitation/invitations-list";

const InvitationsTab = () => {
  const sidebarTab = useHomePageStore.use.sidebarTab();
  const setSidebarTab = useHomePageStore.use.setSidebarTab();

  if (sidebarTab !== "invitations") {
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
          <h2 className="text-xl font-medium">Invitations</h2>
        </div>
      }
    >
      <div className="p-2">
        <InvitationsList />
      </div>
    </BaseTab>
  );
};

export default InvitationsTab;
