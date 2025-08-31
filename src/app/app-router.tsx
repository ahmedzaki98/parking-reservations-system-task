import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import { ProtectedRoute } from "../lib/auth";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

// const checkAuth = () => {
//   return localStorage.getItem("token"); // or cookies/session
// };

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/app/dashboard" replace />,
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
        {
          path: "/app/zones",
          hydrateFallbackElement: (
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner />
            </div>
          ),
          lazy: async () => {
            const { ZonesRoute } = await import("./routes/app/zones/list");
            return { Component: ZonesRoute };
          },
        },
        {
          path: "/app/categories",
          hydrateFallbackElement: (
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner />
            </div>
          ),
          lazy: async () => {
            const { CategoriesRoute } = await import("./routes/app/categories/list");
            return { Component: CategoriesRoute };
          },
        },
        {
          path: "/app/gates",
          hydrateFallbackElement: (
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner />
            </div>
          ),
           lazy: async () => {
           const { GatesRoute } = await import("./routes/app/gates/list");
           return { Component: GatesRoute }
          },
        },
      ],
    },
  ]);
