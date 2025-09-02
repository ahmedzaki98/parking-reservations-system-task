import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { ProtectedRoute } from "../lib/auth";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import PageSpinner from "@/components/page-spinner";


export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/app/zones" replace />,
    },
    {
      path: "/auth/login",
      hydrateFallbackElement: (
       <PageSpinner />
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
        <PageSpinner />
      ),
      children: [
        // zones
        {
          path: "/app/zones",
          hydrateFallbackElement: <PageSpinner />,
          lazy: async () => {
            const { ZonesRoute } = await import("./routes/app/zones/list");
            return { Component: ZonesRoute };
          },
        },
        //
        // categories
        {
          path: "/app/categories",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { CategoriesRoute } = await import(
              "./routes/app/categories/list"
            );
            return { Component: CategoriesRoute };
          },
        },
        //
        // gates
        {
          path: "/app/gates",
          hydrateFallbackElement: (
            <PageSpinner />
          ),
          lazy: async () => {
            const { GatesRoute } = await import("./routes/app/gates/list");
            return { Component: GatesRoute };
          },
        },
        //
        // subscriptions
        {
          path: "/app/subscriptions",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { SubscriptionsRoute } = await import(
              "./routes/app/subscriptions/list"
            );
            return { Component: SubscriptionsRoute };
          },
        },
        {
          path: "/app/subscriptions/view/:id",
          hydrateFallbackElement: (
            <PageSpinner />
          ),
          lazy: async () => {
            const { SubscriptionsViewRoute } = await import(
              "./routes/app/subscriptions/view"
            );
            return { Component: SubscriptionsViewRoute };
          },
        },
        // tickets
        {
          path: "/app/check-in",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { CheckInRoute } = await import(
              "./routes/app/tickets/check-in"
            );
            return { Component: CheckInRoute };
          },
        },
        {
          path: "/app/check-out",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { CheckOutRoute } = await import(
              "./routes/app/tickets/check-out"
            );
            return { Component: CheckOutRoute };
          },
        },
        //
        // reports
        {
          path: "/app/reports",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { ReportsRoute } = await import("./routes/app/reports/list");
            return { Component: ReportsRoute };
          },
        },
        //
        // rush hours
        {
          path: "/app/rush-hours",
          hydrateFallbackElement: (
            <PageSpinner />
          ),
          lazy: async () => {
            const { RushHoursRoute } = await import(
              "./routes/app/rush-hours/create"
            );
            return { Component: RushHoursRoute };
          },
        },
        //
        // vacations
        {
          path: "/app/vacations",
          hydrateFallbackElement: (
           <PageSpinner />
          ),
          lazy: async () => {
            const { addVacationRoute } = await import(
              "./routes/app/vacations/create"
            );
            return { Component: addVacationRoute };
          },
        },
        //
        // not found
        {
          path: "*",
          lazy: async () => {
            const { NotFoundRoute } = await import("./routes/not-found");
            return { Component: NotFoundRoute };
          },
        },
      ],
    },
  ]);
