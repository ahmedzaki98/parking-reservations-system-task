import { AppRouter } from "./router";
import { AuthLoader } from "../lib/auth";
import { Spinner } from "../components/ui/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryConfig } from "../lib/react-query";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useWebSocketStore } from "@/lib/websocket-store";

export const App = () => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig })
  );
  const { connect } = useWebSocketStore();

  useEffect(() => {
    connect(queryClient);
  }, [connect, queryClient]);

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
          <ToastContainer />
          <AppRouter />
        </AuthLoader>
      </QueryClientProvider>
    </React.Suspense>
  );
};
