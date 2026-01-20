import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        isLoggedIn: false,
        role: "",
      },
      login: (role) =>
        set((state) => ({
          user: {
            ...state.user,
            isLoggedIn: true,
            role,
          },
        })),

      logOut: () =>
        set((state) => ({
          user: {
            ...state.user,
            isLoggedIn: false,
            role: "",
          },
        })),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
