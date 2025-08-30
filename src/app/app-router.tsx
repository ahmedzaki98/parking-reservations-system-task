import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import { ProtectedRoute } from "../lib/auth";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

const checkAuth = () => {
  return localStorage.getItem("token"); // or cookies/session
};

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      loader: () => {
        if (!checkAuth()) {
          throw redirect("/auth/login");
        } else {
          throw redirect("/app/dashboard");
        }
      },
    },
    {
      path: "/auth/login",
      hydrateFallbackElement: (
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      ),
      lazy: async () => {
        const { LoginRoute } = await import("./routes/auth/login");

        return { Component: LoginRoute };
      },
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </ProtectedRoute>
      ),
      hydrateFallbackElement: (
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      ),
      children: [
        {
          path: "/app/dashboard",
          hydrateFallbackElement: (
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner />
            </div>
          ),
          lazy: async () => {
            const { DashboardRoute } = await import(
              "./routes/app/dashboard/dashboard"
            );

            return { Component: DashboardRoute };
          },
        },
      ],
    },
  ]);
