import { create } from "zustand";
import { createSelectorFunctions } from "auto-zustand-selectors-hook";

type Sidebar = "main" | "invitations" | "profile";

type HomePageStore = {
  sidebarTab: Sidebar;
  setSidebarTab: (tab: Sidebar) => void;
};

const useBaseStore = create<HomePageStore>((set) => ({
  sidebarTab: "main",
  setSidebarTab(to) {
    set({
      sidebarTab: to,
    });
  },
}));

const useHomePageStore = createSelectorFunctions(useBaseStore);

export default useHomePageStore;
