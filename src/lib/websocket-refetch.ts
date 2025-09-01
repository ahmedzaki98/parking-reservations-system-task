import type { QueryClient } from "@tanstack/react-query";
import type { WSMessage } from "./websocket-store";

type Props = {
  msg: WSMessage;
  queryClient: QueryClient;
};
export const websocketRefetch = ({ queryClient, msg }: Props) => {
  const type = msg.payload.action;

  switch (type) {
    case "category-rates-changed":
      queryClient.invalidateQueries({ queryKey: ["categoriesGrid"] });
      break;
    case "rush-updated":
      queryClient.invalidateQueries({ queryKey: ["rushGrid"] });
      break;
    case "vacation-added":
      queryClient.invalidateQueries({ queryKey: ["vacation"] });
      break;

    default:
      break;
  }
};

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

export const websocketRefetchZones = ({ queryClient, msg }: Props) => {
  // if (refreshTimeout) return;
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
  refreshTimeout = setTimeout(() => {
    if (msg.type === "admin-update") {
      websocketRefetch({ queryClient, msg });
    } else {
      queryClient.invalidateQueries({ queryKey: ["zonesGrid"] });
    }
    refreshTimeout = null;
  }, 1000);
};
