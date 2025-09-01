import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserEntity } from "./auth";

interface AuthState {
  user: UserEntity | undefined;
  setUser: (user: UserEntity | undefined) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user: UserEntity | undefined) => {
        set({ user });
      },
    }),
    {
      name: "user",
    }
  )
);
