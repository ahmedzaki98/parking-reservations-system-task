import { useAuthStore } from "./auth.store";

export type Role = "admin" | "employee";

export const useAuthorization = () => {
  const { user } = useAuthStore();
  if (!user) throw new Error("User does not exist!");

  const checkAccess = ({ allowRoles }: { allowRoles: Role[] }) => {
    if (allowRoles && allowRoles.length > 0 && user) {
      return allowRoles.includes(user.role);
    }
    return true;
  };

  return {
    checkAccess,
  };
};