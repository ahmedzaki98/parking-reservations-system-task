import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./app-router";



export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);

  return <RouterProvider router={router} />;
};
