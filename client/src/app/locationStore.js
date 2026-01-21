import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocationStore = create(
  persist(
    (set) => ({
      location: null,
      setLocation: (location) => set({ location: location }),
      clearLocation: () => set({ location: null }),
    }),
    {
      name: "location-store",
    },
  ),
);
