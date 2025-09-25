import { create } from "zustand";
import { devtools } from "zustand/middleware";

const userStore = (set) => ({
  user: {},
  logIn: (userData) => {
    set(() => ({
      user: userData,
    }));
  },
  logout: () => {
    set(() => ({
      user: {},
    }));
  },
});
export const useUserStore = create(devtools(userStore, { name: "userStore" }));
    