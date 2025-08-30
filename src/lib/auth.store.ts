import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserEntity } from "./auth";

interface AuthState {
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserEntity | null) => {
        set({ user });
      },
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user",
    }
  )
);
