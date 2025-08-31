import { z } from "zod";
import { api, getToken } from "./api-client";
import { configureAuth } from "react-query-auth";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./auth.store";

export type UserEntity ={
  id: string;
  username: string;
  role: "admin" | "employee";
}
export type AuthResponse = {
  data: {
    token: string;
    user: UserEntity;
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export const loginInputSchema = z.object({
  username: z.string().min(3, "REQUIRED").max(70, "USER_NAME_TOO_LONG"),
  password: z.string().min(5, {
    message: "REQUIRED",
  }),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post("/auth/login", data);
};

const authConfig = {
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    
    //save token on local storage
    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    const user = response.data.user;
    useAuthStore.getState().setUser(user);
    return user;
  },
  logoutFn: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return;
  },
  userFn: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return null;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerFn: async (_data: unknown) => {
    return null;
  },
};
// eslint-disable-next-line react-refresh/only-export-components
export const {useUser, useLogin, useLogout, AuthLoader } = configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  // const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
