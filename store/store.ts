import { create } from "zustand";

interface StoreState {
  search: string;
  setSearch: (search: string) => void;
}

const useStore = create<StoreState>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));

export default useStore;
