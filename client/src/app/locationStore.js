import { create } from "zustand";
import { devtools } from "zustand/middleware";

const locationStore = (set) => ({
  location: null,
  setLocation: (userLocation) => {
    set(() => ({ location: userLocation }), false, "setLocation");
  },
});

export const useLocationStore = create(
  devtools(locationStore, { name: "locationStore" })
);
