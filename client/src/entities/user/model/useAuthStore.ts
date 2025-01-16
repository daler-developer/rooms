import { create } from "zustand";

type AuthStore = {
  userId: number | null;
  setUserId: (userId: number) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  userId: null,
  setUserId: (userId: number | null) => set({ userId }),
}));

export default useAuthStore;
