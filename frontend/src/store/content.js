import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentRype: (type) => set({ contentType: type }),
}));
