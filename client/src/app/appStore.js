import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const appStore = (set) => ({
  user: null,
  location: null,
  login: (userData) =>
    set(
      (state) => ({
        ...state,
        user: userData,
      }),
      false,
      "login"
    ),
  logout: () =>
    set(
      (state) => ({
        ...state,
        user: null,
      }),
      false,
      "logout"
    ),
  setLocation: (userLocation) =>
    set(
      (state) => ({
        ...state,
        location: userLocation,
      }),
      false,
      "setLocation"
    ),
});

export const useAppStore = create(
  devtools(
    persist(appStore, {
      name: "app-storage",
      partialize: (state) => ({ location: state.location }),
    }),
    { name: "appStore" }
  )
);
