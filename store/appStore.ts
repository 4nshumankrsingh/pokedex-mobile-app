import { create } from "zustand";

interface AppStore {
  isAppReady: boolean;
  setAppReady: (ready: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isAppReady: false,
  setAppReady: (ready) => set({ isAppReady: ready }),
}));
