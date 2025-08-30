import { AppRouter } from "./router";
import { AuthLoader } from "../lib/auth";
import { Spinner } from "../components/ui/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "../lib/react-query";
import React,{ useState } from "react";

export const App = () => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig })
  );
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <AuthLoader
          renderLoading={() => (
            <div className="flex h-screen w-screen items-center justify-center">
              <Spinner />
            </div>
          )}
        >
          <AppRouter />
        </AuthLoader>
      </QueryClientProvider>
    </React.Suspense>
  );
};
