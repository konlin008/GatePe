import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  user: {
    isLoggedIn: false,
    role: "",
  },
};

const useUserStore = create(
  persist(
    (set) => ({
      ...initialState,

      login: (role) =>
        set({
          user: {
            isLoggedIn: true,
            role,
          },
        }),
      logOut: () => set(initialState),
    }),
    {
      name: "user-storage",
    },
  ),
);

export default useUserStore;
